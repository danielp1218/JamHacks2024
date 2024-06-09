def prediction_function(model_path, image_path):

    import torch
    import torch.nn as nn
    from torchvision import transforms
    from PIL import Image

    class CNN(nn.Module):
        def __init__(self):
            super(CNN, self).__init__()
            self.conv1 = nn.Sequential(
                nn.Conv2d(in_channels=3, out_channels=32, kernel_size=3, stride=1, padding=0),
                nn.BatchNorm2d(32),
                nn.ReLU(inplace=True),
                nn.MaxPool2d(2, 2))
            self.conv2 = nn.Sequential(
                nn.Conv2d(in_channels=32, out_channels=64, kernel_size=2, stride=1, padding=1),
                nn.BatchNorm2d(64),
                nn.ReLU(inplace=True),
                nn.MaxPool2d(2, 2))
            self.conv3 = nn.Sequential(
                nn.Conv2d(in_channels=64, out_channels=128, kernel_size=3, stride=1, padding=1),
                nn.BatchNorm2d(128),
                nn.ReLU(inplace=True),
                nn.MaxPool2d(2, 2))
            self.conv4 = nn.Sequential(
                nn.Conv2d(in_channels=128, out_channels=256, kernel_size=3, stride=1, padding=1),
                nn.BatchNorm2d(256),
                nn.ReLU(inplace=True),
                nn.MaxPool2d(2, 2))
            self.conv5 = nn.Sequential(
                nn.Conv2d(in_channels=256, out_channels=512, kernel_size=3, stride=1, padding=1),
                nn.BatchNorm2d(512),
                nn.ReLU(inplace=True),
                nn.MaxPool2d(2, 2))

            self.fc = nn.Sequential(
                nn.Linear(512 * 3 * 3, 1024),
                nn.ReLU(inplace=True),
                nn.Dropout(0.4),
                nn.Linear(1024, 512),
                nn.Dropout(0.4),
                nn.Linear(512, 1),
            )

        def forward(self, x):
            x = self.conv1(x)
            x = self.conv2(x)
            x = self.conv3(x)
            x = self.conv4(x)
            x = self.conv5(x)
            x = x.view(x.shape[0], -1)
            x = self.fc(x)
            return x.squeeze()

    def load_model(model_path):
        model = CNN()
        state_dict = torch.load(model_path, map_location=torch.device('cpu'))
        model.load_state_dict(state_dict)
        model.eval()
        return model

    def preprocess_image(image_path):
        transform = transforms.Compose([
            transforms.Resize((96, 96)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        ])
        img = Image.open(image_path).convert('RGB')
        img = transform(img)
        img = img.unsqueeze(0)
        return img

    def predict_image(model_path, image_path):
        model = load_model(model_path)
        img_tensor = preprocess_image(image_path)
        with torch.no_grad():
            prediction = model(img_tensor)
            prediction = torch.sigmoid(prediction)
            prediction = prediction.numpy()
        return prediction

    if __name__ == "__main__":
        prediction = predict_image(model_path, image_path)
        print("Final prediction:", prediction)
    
    return prediction
