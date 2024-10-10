default: _site
	bundle exec jekyll build

serve:
	bundle exec jekyll serve --port 3000

dependencies:
	gem install jekyll bundler aws-sdk-s3 rack

publish: default
	./publish _site

.PHONY: publish
