const SpecifiCalc = (function () {
	const stripSelectors = (str) => {
			const selectorPatterns = /[>~+]/g,
				sequentialSpaces = /\s+/g;
		
			let tmpSelectors = str.replace(selectorPatterns, " ");
			
			tmpSelectors = tmpSelectors.replace(sequentialSpaces, " ");
		
			return tmpSelectors;	
		},
		
		countIds = (selector_array) => {			
			const idPattern = /#.+/;
		
			let count = 0;
		
			selector_array.forEach((i) => {
				if (idPattern.test(i)) {
					//console.log('selector: ', i);
					count += 1;
				}
			});
		
			//console.log('universal selectors: ', count, selectors, this.state.count);
		
			return count;
		},
		
		countClassesAndPsuedos = (selector_array) => {			
			const classPattern = /\..+/;
			const psuedoPattern = /:.+/;
		
			let count = 0;
		
			selector_array.forEach((i) => {
				if (classPattern.test(i) || psuedoPattern.test(i)) {
					//console.log('selector: ', i);
					count += 1;
				}
			});
		
			//console.log('universal selectors: ', count, selectors, this.state.count);
		
			return count;
		},
		
		countElements = (selector_array) => {			
			const elementsPattern = /^[^\.#:]/;
		
			let count = 0;
		
			selector_array.forEach((i) => {
				if (elementsPattern.test(i)) {
					//console.log('selector: ', i);
					count += 1;
				}
			});
		
			//console.log('universal selectors: ', count, selectors, this.state.count);
		
			return count;
		},
		
		mainFn = (selector) => {
			const selectors = stripSelectors(selector).split(" ");
			
			const id_count = countIds(selectors),
				class_psuedo_count = countClassesAndPsuedos(selectors),
				elements_count = countElements(selectors);
			
			return id_count + ", " + class_psuedo_count + ", " + elements_count;		
		};
		
	mainFn.stripSelectors = stripSelectors;
	mainFn.countIds = countIds;
	mainFn.countClassesAndPsuedos = countClassesAndPsuedos;
	mainFn.countElements = countElements;
	
	return mainFn;
		
}());