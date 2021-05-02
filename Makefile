PAGES  := popol/ donate/ nakamoto/ whoami/
STATIC := css/ images/ fonts/ js/ favicon.png avatar.png

default:
	./build ~/txt/pub .

publish:
	./publish $(STATIC) $(PAGES) public/ index.html style.css

deps:
	gem install commonmarker aws-sdk-s3 rack

.PHONY: publish
