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
		
		countClassesAndPseudos = (selector_array) => {			
			const classPattern = /\..+/;
			const pseudoPattern = /:.+/;
		
			let count = 0;
		
			selector_array.forEach((i) => {
				if (classPattern.test(i) || pseudoPattern.test(i)) {
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
		
		calculate = (selector) => {
			const selectors = stripSelectors(selector).split(" ");
			
			return {
				ids 		: countIds(selectors),
				attributes 	: countClassesAndPseudos(selectors),
				elements	: countElements(selectors)
			};
		},
		
		asInt = (selector) => {
			const counts = calculate(selector);
			
			return parseInt((counts.ids.toString() + counts.attributes.toString() + counts.elements.toString()));
		},
		
		mainFn = (selector) => {
			const counts = calculate(selector);
						
			return counts.ids + "," + counts.attributes + "," + counts.elements;		
		};
		
	mainFn.stripSelectors = stripSelectors;
	mainFn.countIds = countIds;
	mainFn.countClassesAndPseudos = countClassesAndPseudos;
	mainFn.countElements = countElements;
	mainFn.asInt = asInt;
	
	return mainFn;
		
}());