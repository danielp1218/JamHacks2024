function matlab_api = matlab_api(imagePath)

pythonScriptPath = 'C:\Users\tsara\Downloads\JamHacks2024\ai_model.py';  
modelPath = 'C:\Users\tsara\Downloads\best_model.pt';                 

command = sprintf('python "%s" "%s" "%s"', pythonScriptPath, modelPath, imagePath);
[status, result] = system(command);

if status == 0
    disp(result);
else
    error('Error in calling Python script.');
end

matlab_api = result;
