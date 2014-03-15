COMPILER = lib/compiler.jar
COMPILE = java -jar $(COMPILER)

SRCS = \
       maplithuania.js

SRC_DIR = src
BUILD_DIR = build/js-lithuania-map
OUTPUT_FILE_NAME = map-lithuania.min.js

COMPILE_SRCS = ${addprefix --js=$(SRC_DIR)/, $(SRCS)} \
	$(BUILD_DIR)/map.js

COMPILE_OPTIMIZATIONS = ADVANCED_OPTIMIZATIONS
COMPILER_FLAGS = --compilation_level $(COMPILE_OPTIMIZATIONS) \
	--js_output_file=$(BUILD_DIR)/$(OUTPUT_FILE_NAME) \
	--output_wrapper "(function() {%output%})();"

STATIC_FILES = \
	$(SRC_DIR)/lithuania-map.css


all: make-dirs compile-svg compile copy-static remove-compiled-svg
.PHONY: all


make-dirs:
	mkdir -p $(BUILD_DIR)
.PHONY: make-dirs


compile:
	$(COMPILE) $(COMPILE_SRCS) $(COMPILER_FLAGS)
.PHONY: compile


copy-static:
	cp $(STATIC_FILES) $(BUILD_DIR)
.PHONY:


compile-svg:
	sed "s:^:':g" $(SRC_DIR)/lithuania_counties.svg  > $(BUILD_DIR)/map.js
	sed -i "s:$$:'+:g" $(BUILD_DIR)/map.js
	sed -i "1s:^:mapLithuania.strSvgMap=:" $(BUILD_DIR)/map.js
	echo "'';\n" >> $(BUILD_DIR)/map.js
	echo "mapLithuania['strSvgMap']=mapLithuania.strSvgMap;" \
		>> $(BUILD_DIR)/map.js
.PHONY: compile-svg


remove-compiled-svg:
	rm $(BUILD_DIR)/map.js
.PHONY: remove-compiled-svg


clean:
	rm -rf $(BUILD_DIR)
.PHONY: clean
