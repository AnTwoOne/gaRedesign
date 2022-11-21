import gaTabs from './tabClass.js';

// //Select the tabs__openers
// const tabsOpeners = document.querySelectorAll('.tabs__opener');

// //Create a function that takes the an accordion opener as argument
// function openTab(tabsOpener) {
// 	//Select the tab illustration that matched the accordion opener data tab attribute
// 	const tabIllustration = document.querySelector(`.tabs__illustration[data-tab="${tabsOpener.dataset.tab}"]`);
// 	//Select the tab divider overlay that matched the accordion opener data tab attribute
// 	const tabDividerOverlay = document.querySelector(`.tabs__divider-overlay[data-tab="${tabsOpener.dataset.tab}"]`);
// 	//Select the accordion target that matched the accordion opener data tab attribute
// 	const tabsTarget = document.querySelector(`.tabs__target[data-tab="${tabsOpener.dataset.tab}"]`);
// 	//Select the icon with class opener icon that matched the data tab attribute
// 	const openerIcon = document.querySelector(`.opener-icon[data-tab="${tabsOpener.dataset.tab}"]`);

// 	//Select all the accordion targets that are not the accordion target
// 	const othertabsTargets = document.querySelectorAll(`.tabs__target:not([data-tab="${tabsOpener.dataset.tab}"])`);

// 	//Select all the opener icons that are not the opener icon
// 	const otherOpenerIcons = document.querySelectorAll(`.opener-icon:not([data-tab="${tabsOpener.dataset.tab}"])`);

// 	//Select all the tabIllustrations that are not the tab illustration
// 	const otherTabIllustrations = document.querySelectorAll(`.tabs__illustration:not([data-tab="${tabsOpener.dataset.tab}"])`);

// 	//Select all the tabDividerOverlays that are not the tab divider overlay
// 	const otherTabDividerOverlays = document.querySelectorAll(`.tabs__divider-overlay:not([data-tab="${tabsOpener.dataset.tab}"])`);

// 	//Remove the class js-tabs__ilustration--active from all the tab illustrations that are not the tab illustration
// 	otherTabIllustrations.forEach((otherTabIllustration) => {
// 		otherTabIllustration.classList.remove('js-tabs__illustration-active');
// 	});

// 	//Remove the class js-opener-icon-rotated from all the opener icons that are not the opener icon
// 	otherOpenerIcons.forEach((otherOpenerIcon) => {
// 		otherOpenerIcon.classList.remove('js-opener-icon-rotated');
// 	});

// 	//Remove the class js-accordion-opened from the other accordion targets
// 	othertabsTargets.forEach((othertabsTarget) => {
// 		othertabsTarget.classList.remove('js-tab-opened');
// 	});

// 	//Remove the class js-tabs__divider-overlay--active from the other tab divider overlays
// 	otherTabDividerOverlays.forEach((otherTabDividerOverlay) => {
// 		otherTabDividerOverlay.classList.remove('js-divider-overlay-animated');
// 	});

// 	//add the class js-accordion-opened to the accordion target
// 	tabsTarget.classList.add('js-tab-opened');

// 	//add the class js-tabs__illustration-active to the tab illustration
// 	tabIllustration.classList.add('js-tabs__illustration-active');

// 	//add the class js-divider-overlay-animated to the tab divider overlay
// 	tabDividerOverlay.classList.add('js-divider-overlay-animated');

// 	//add the class js-opener-icon-rotated to the chevron up
// 	openerIcon.classList.add('js-opener-icon-rotated');
// }

// //For each accordion opener add an event listener that calls the openTab function
// tabsOpeners.forEach((tabsOpener) => {
// 	tabsOpener.addEventListener('click', () => {
// 		openTab(tabsOpener);
// 	});
// });

const dividerBehavior = (tab) => {
	const tabOpeners = tab.querySelectorAll('.tab-opener');
	const animateTabDivider = (tabOpener) => {
		const tabDividerOverlay = tab.querySelector(`.tab__divider-overlay[data-tab="${tabOpener.dataset.opens}"`);
		const otherTabDividerOverlays = tab.querySelectorAll(`.tab__divider-overlay:not([data-tab="${tabOpener.dataset.opens}"])`);
		otherTabDividerOverlays.forEach((tabDividerOverlay) => {
			tabDividerOverlay.classList.remove('js-divider-overlay-animated');
		});
		tabDividerOverlay.classList.toggle('js-divider-overlay-animated');
	};
	tabOpeners.forEach((tabOpener) => {
		tabOpener.addEventListener('click', () => {
			animateTabDivider(tabOpener);
		});
	});
};

// We want to create a function that will animated the tab content children element when the class js-tab-content-active is added to the tab content element
// We  will create two animations, one for when the class is added and one for when the class is removed
// We will use the animation library GSAP to create the animations

const animateTabContent = (tabContent, direction, duration) => {

	const tabContentOverlay = tabContent.querySelector(".tab-content__overlay");
	const tabContentProductShot = tabContent.querySelector(".product-shot");

	

    // Create the enter animation with GSAP timeline
    // The tab content background overlay will move right to left by 200px and fade in
    // The tab content product shot will move from top to bottom by 50px and fade in
	const enterAnimation = gsap.timeline();
    
    

    // Create the exit animation with GSAP timeline
    // The tab content background overlay will move left to right by 200px and fade out
    // The tab content product shot will move from bottom to top by 50px and fade out
    const exitAnimation = gsap.timeline();
    
    

	if(direction === 'exit') {
		// const exitAnimation = gsap.timeline();
		exitAnimation.fromTo(tabContentOverlay, { x: 0, opacity: 1 }, { x: 200, opacity: 0, duration: (duration / 1000) - 0.2 });
    	exitAnimation.fromTo(tabContentProductShot, { y: 0, opacity: 1 }, { y: -50, opacity: 0, duration: (duration / 1000) - 0.2 } , `-=${(duration / 1000) - 0.2}`);
		//On complete we will remove the class js-tab-content-active from the tab content element
		exitAnimation.eventCallback('onComplete', () => {
			console.log('exit animation complete', tabContent);
			tabContent.classList.remove('js-tab-content-active');
		});
		
	} else {
		tabContent.classList.add('js-tab-content-active') 
		enterAnimation.fromTo(tabContentOverlay, { x: 200, opacity: 0 }, { x: 0, opacity: 1, duration: duration / 1000 });
    	enterAnimation.fromTo(tabContentProductShot, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: duration / 1000 }, `-=${duration / 1000}`);
		//On complete we will add the js-tab-content-active class to the tab content
	}
}

// Feature tab content animation
const animateFeatureTabContent = (tabContent, direction, duration) => {

	const featureTabColumns = tabContent.querySelectorAll('.feature-tab__col');

	const enterAnimation = gsap.timeline();
	const exitAnimation = gsap.timeline();

	if(direction === 'exit') {
		exitAnimation.fromTo(tabContent, { opacity: 1 }, { opacity: 0, duration: (duration / 1000) });
		exitAnimation.fromTo(featureTabColumns[0], { y: 0}, { y: -15, duration: (duration / 1000) - 0.2 }, `-=${(duration / 1000) }`);
		exitAnimation.fromTo(featureTabColumns[1], { y: -46}, { y: 0, duration: (duration / 1000) - 0.2 }, `-=${(duration / 1000)}`);
		
		exitAnimation.eventCallback('onComplete', () => {
			console.log('exit animation complete', tabContent);
			tabContent.classList.remove('js-tab-content-active');
		});
		
	} else {
		tabContent.classList.add('js-tab-content-active');
		enterAnimation.fromTo(tabContent, { opacity: 0 }, { opacity: 1, duration: duration / 1000 });
		enterAnimation.fromTo(featureTabColumns[0], { y: 15}, { y: 0, duration: duration / 1000 - 0.2 }, `-=${duration / 1000} - 0.2`);
		enterAnimation.fromTo(featureTabColumns[1], { y: 0}, { y: -46, duration: duration / 1000 - 0.2 }, `-=${duration / 1000} - 0.2`);
		
	}
}

const tab = new gaTabs(
	'.tabs',
	{ tabToggle: false, animation: {status: true, function: animateTabContent, duration: 3000} },
	{
		dividerBehavior: dividerBehavior
	}
).init();

const featureTab = new gaTabs('.features-tab-container', { tabToggle: false, animation: {status: true, function: animateFeatureTabContent, duration: 500 } }).init();
