default: _site
	jekyll build

serve:
	jekyll serve --port 3000

dependencies:
	gem install jekyll bundler aws-sdk-s3

publish: default
	./publish _site

.PHONY: publish
