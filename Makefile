PAGES  := popol/ donate/ nakamoto/ whoami/
STATIC := css/ images/ fonts/ js/ favicon.png

default:
	./build ~/txt/pub .

publish:
	./publish $(STATIC) $(PAGES) public/ index.html style.css

.PHONY: publish
