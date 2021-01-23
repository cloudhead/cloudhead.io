PAGES  := popol/ donate/ nakamoto/
STATIC := css/ images/ fonts/ js/

default:
	./build ~/txt/pub .

publish:
	./publish $(STATIC) $(PAGES) index.html style.css

.PHONY: publish
