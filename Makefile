COMPILER = lib/compiler.jar
COMPILE = java -jar $(COMPILER)

SRCS = \
       MapLithuania.js

SRC_DIR = src
BUILD_DIR = build/js-lithuania-map
OUTPUT_FILE_NAME = MapLithuania.min.js

COMPILE_SRCS = ${addprefix --js=$(SRC_DIR)/, $(SRCS)}
COMPILE_OPTIMIZATIONS = ADVANCED_OPTIMIZATIONS
COMPILER_FLAGS = --compilation_level $(COMPILE_OPTIMIZATIONS) \
	--js_output_file=$(BUILD_DIR)/$(OUTPUT_FILE_NAME) \
	--output_wrapper "(function() {%output%})();"

STATIC_FILES = \
	$(SRC_DIR)/lithuania_counties.svg \
	$(SRC_DIR)/lithuania-map.css


all: compile copy-static
.PHONY: all


compile:
	mkdir -p $(BUILD_DIR)
	$(COMPILE) $(COMPILE_SRCS) $(COMPILER_FLAGS)
.PHONY: compile


copy-static:
	cp $(STATIC_FILES) $(BUILD_DIR)
.PHONY:


clean:
	rm -rf $(BUILD_DIR)
.PHONY: clean
