pythonScriptPath = 'ai_model_final.py';
modelPath = 'C:\Users\tsara\Downloads\best_model.pt';    
imagePath = 'C:\Users\tsara\Downloads\000eafa5c4bb43c9fd886d07783419999ba103dc.tif';                

command = sprintf('python "%s" "%s" "%s"', pythonScriptPath, modelPath, imagePath);
[status, result] = system(command);

if status == 0
    disp(result);
else
    error('Error in calling Python script.');
end
