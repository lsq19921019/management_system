path=$(npm prefix -g)
if command -v $path/rimraf >/dev/null 2>&1; then
	echo 'exists rimraf'
else
	npm install -g rimraf
fi
$path/rimraf node_modules/
npm install  
