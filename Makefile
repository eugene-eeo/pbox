dist:
	cat lib/*.js src/app.js > dist.js

deploy: dist
	uglifyjs --mangle --compress -- dist.js > dist.min.js
	mv dist.min.js docs/dist.js
	cp index.html docs/
