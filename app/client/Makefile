.PHONY: all test coverage

all: test coverage

test:
	ls lib/* | while read f; do echo $$f ; jslint $$f; done
	ls test/* | while read t; do echo $$t;  expresso -s $$t; done
	expresso -s

coverage:
	expresso -s -c 2> reports/coverage | tee reports/coverage.summary
	echo "check reports/coverage for detail"


