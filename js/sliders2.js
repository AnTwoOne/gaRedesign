

// Custom extensions
const scaleDownInactive = function (Splide, Components, options) {
	const Component = {
		mount() {
			this.scaleDownSlides();
		},

		scaleDownSlides() {
			let perPageValue = Splide.options.perPage;
			let sliderType = Splide.options.type;

			const updateTheSlides = (event) => {
				if (sliderType === 'slide') {
					//Wait a little bit to allow for the the classes to apply
					setTimeout(() => {
						//Select the slides that don't have the is-visible class
						const inactiveSlides = [...Splide.Components.Elements.slides].filter((slide) => {
							return !slide.classList.contains('is-visible');
						});
						//Select the slides that have the is-visible class
						const visibleSlides = [...Splide.Components.Elements.slides].filter((slide) => {
							return slide.classList.contains('is-visible');
						});
						//Make all the slides scaled to 1
						Splide.Components.Elements.slides.forEach((slide) => slide.setAttribute('data-scale', 'initial'));
						if (visibleSlides.length === perPageValue) {
							//Wait for the number of visible slides to be equal to the desired amount of slides per view
							//Scale down the slides outside of the viewport
							inactiveSlides.forEach((slide) => slide.setAttribute('data-scale', 'scaleDown'));
						}
					}, 50);
				}
				if (sliderType === 'loop') {
					const allSlides = [...Splide.root.querySelectorAll('.splide__slide')];
					allSlides.forEach((slide) => {
						setTimeout(() => {
							const inactiveSlides = [...allSlides].filter((slide) => {
								return !slide.classList.contains('is-visible');
							});
							const visibleSlides = [...allSlides].filter((slide) => {
								return slide.classList.contains('is-visible');
							});
							allSlides.forEach((slide) => slide.setAttribute('data-scale', 'initial'));
							if (visibleSlides.length === perPageValue) {
								inactiveSlides.forEach((slide) => slide.setAttribute('data-scale', 'scaleDown'));
							}
						}, 50);
					});
				}
			};
			Splide.on('ready', updateTheSlides);
			Splide.on('moved', updateTheSlides);
		}
	};

	return Component;
};

const scaleUpOnHover = function (Splide, Components, options) {
	const Component = {
		mount() {
			this.scaleUpSlidesOnHover();
		},

		scaleUpSlidesOnHover() {
			Splide.on('ready', () => {
				Splide.root.querySelectorAll('.splide__slide').forEach((slide) => {
					slide.firstElementChild.addEventListener('mouseenter', () => {
						slide.setAttribute('data-scale', 'scaleUp');
					});
					slide.firstElementChild.addEventListener('mouseleave', () => {
						slide.setAttribute('data-scale', 'initial');
					});
				});
			});
		}
	};
	return Component;
};
const AsNavFor = function (Splide, Components, options) {
	const sliderPerPage = Splide.options.perPage;
	const Component = {
		mount() {
			this.asNavFor();
		},
		asNavFor() {
			const callback = (event) => {
				// console.log('run');
				const visible = [...Splide.Components.Elements.slides].filter((slide) => {
					return slide.classList.contains('is-visible') || slide.classList.contains('is-active');
				});
				const targetContainer = document.querySelector(`#${Splide.root.dataset.asnavfor}`);
				// // console.log(targetContainer);
				// console.log(Splide.root.dataset.asnavfor);
				// console.log(visible);
				const targetIndex = visible[0].dataset.illustration;
				const target = targetContainer.querySelector(`.content__container[data-illustration="${targetIndex}"]`);
				//Select other content containers that are not the target
				const otherContentContainers = [...targetContainer.querySelectorAll('.content__container')].filter((container) => {
					return container !== target;
				});
				//Remove active class from other content containers
				otherContentContainers.forEach((container) => {
					container.classList.remove('js-content__container-active');
				});
				//Add active class to target
				target.classList.add('js-content__container-active');
			};

			if (sliderPerPage > 1) {
				Splide.on('visible', callback);
			}

			if (sliderPerPage === 1) {
				Splide.on('active', callback);
			}
			// Splide.on(
			// 	'moved',
			// 	setTimeout(() => {
			// 		Component.asNavFor();
			// 	}, 100)
			// );
		}
	};

	return Component;
};
const FiveStepsSliderBehavior = function (Splide, Components, options) {
	const Component = {
		mount() {
			this.fiveStepsSliderBehavior();
		},
		fiveStepsSliderBehavior() {
			//Get the card toggles
			const cardToggles = [...Splide.Components.Elements.list.children].map((slide) => {
				return slide.querySelector('.clickUp-toggle');
			});
			// console.log(cardToggles);
			//Get the cards
			const cards = [...Splide.Components.Elements.list.children];
			// console.log(cards);
			//Make a function that check if an element is hovered
			const isHovered = (element) => {
				return element.parentElement.querySelector(':hover') === element;
			};
			//For each card toggle on click move the slider to the corresponding slide
			cardToggles.forEach((cardToggle, index) => {
				cardToggle.addEventListener('click', () => {
					Splide.go(index);
				});
			});
			//Get the slider arrows inside the cards
			const sliderArrows = [...Splide.Components.Elements.list.children].map((slide) => {
				return slide.querySelector('.slider-arrows');
			});
			//For each slider arrow on click move the slider to the next slide
			sliderArrows.forEach((arrow) => {
				arrow.addEventListener('click', () => {
					Splide.go('>');
					//On move open the active card and close the others
					Splide.on('moved', (newIndex) => {
						console.log(Splide);
						// console.log(Splide.Components.Slides.getAt(newIndex));
						const activeSlide = Splide.Components.Slides.getAt(newIndex);
						const activeCard = activeSlide.slide.firstElementChild;
						activeCard.setAttribute('data-state', 'opened');
						// Closing the other slides
						const otherSlides = [...Splide.Components.Elements.slides].filter((slide) => {
							return slide !== activeSlide.slide;
						});
						console.log(otherSlides);
						otherSlides.forEach((slide) => {
							slide.firstElementChild.setAttribute('data-state', 'closed');
						});
					});
				});
			});
			//For each card on click open the card, close the others and move the the corresponsding slide
			cards.forEach((card, index) => {
				card.addEventListener('click', () => {
					if (!isHovered(card.querySelector('.slider-arrows')) && !isHovered(card.querySelector('.clickUp-toggle'))) {
						Splide.go(index);
						const activeSlide = Splide.Components.Slides.getAt(index);
						const activeCard = activeSlide.slide.firstElementChild;
						activeCard.setAttribute('data-state', 'opened');
						// Closing the other slides
						const otherSlides = [...Splide.Components.Elements.slides].filter((slide) => {
							return slide !== activeSlide.slide;
						});
						console.log(otherSlides);
						otherSlides.forEach((slide) => {
							slide.firstElementChild.setAttribute('data-state', 'closed');
						});
					}
				});
			});
		}
	};
	return Component;
};

// Slider instances
if (document.querySelector('.slider__full-width')) {
	const fullWidthSlider = new Splide('.slider__full-width', {
		type: 'loop',
		width: '100%',
		perMove: 3,
		height: '650px',
		fixedHeight: '600px',
		rewind: true,
		rewindByDrag: true,
		perPage: 3,
		drag: true,
		gap: '30px',
		arrows: false,
		pagination: true,
		accesibility: true,
		flickPower: 1500,
		focus: 'center',
		classes: {
			pagination: 'splide__pagination slider-dots',
			page: 'splide__pagination__page slider-dot',
			arrows: 'splide__arrows slider__arrows',
			arrow: 'splide__arrow slider__arrow',
			prev: 'splide__arrow--prev slider__arrow--prev',
			next: 'splide__arrow--next slider__arrow--next'
		},
		breakpoints: {
			992: {
				// fixedWidth: '350px',
				perPage: '2',
				perMove: '2',
				gap: 'clamp(16px, calc(1rem + ((1vw - 5.6px) * 3.2407)), 30px)'
			},
			560: {
				// fixedWidth: '350px',
				perPage: 1,
				perMove: 1,
				fixedWidth: '90%',
				fixedHeight: '400px',
				gap: '20px'
			}
		}
	}).mount({ scaleDownInactive: scaleDownInactive, scaleUpOnHover: scaleUpOnHover });
}
if (document.querySelector('.slider__testimonial')) {
	const testimonialSlider = new Splide('.slider__testimonial', {
		type: 'loop',
		width: '100%',
		perPage: 1,
		perMove: 1,
		gap: '30px',
		drag: true,
		arrows: true,
		pagination: false
	}).mount();
}
if (document.querySelector('.slider__asNavForTabs')) {
	const sliderAndTab = new Splide('.slider__asNavForTabs', {
		type: 'slide',
		width: '100%',
		startAt: 0,
		perPage: 2,
		perMove: 2,
		height: '650px',
		rewind: true,
		rewindByDrag: true,
		drag: true,
		gap: '30px',
		arrows: false,
		pagination: true,
		flickPower: 1000,
		classes: {
			pagination: 'splide__pagination slider-dots',
			page: 'splide__pagination__page slider-dot',
			arrows: 'splide__arrows slider__arrows',
			arrow: 'splide__arrow slider__arrow',
			prev: 'splide__arrow--prev slider__arrow--prev',
			next: 'splide__arrow--next slider__arrow--next'
		},
		breakpoints: {
			992: {
				gap: 'clamp(16px, calc(1rem + ((1vw - 5.6px) * 3.2407)), 30px)'
			},
			560: {
				perPage: 1,
				perMove: 1,
				fixedWidth: '80%',
				height: '400px'
			}
		}
	}).mount({ AsNavFor: AsNavFor, scaleDownInactive: scaleDownInactive, scaleUpOnHover: scaleUpOnHover });
}
if (document.querySelector('.slider__vertical')) {
	const sliderVertical = new Splide('.slider__vertical', {
		type: 'loop',
		direction: 'ttb',
		paginationDirection: 'ttb',
		heightRatio: 1,
		perPage: 1,
		perMove: 1,
		width: '100%',
		gap: '30px',
		drag: true,
		arrows: false,
		pagination: true,
		classes: {
			pagination: 'splide__pagination slider-dots--vertical mega-offset__left',
			page: 'splide__pagination__page slider-dot',
			arrows: 'splide__arrows slider__arrows',
			arrow: 'splide__arrow slider__arrow',
			prev: 'splide__arrow--prev slider__arrow--prev',
			next: 'splide__arrow--next slider__arrow--next'
		},
		breakpoints: {
			560: {
				gap: '30px',
				paginationDirection: 'ltr',
				direction: 'ltr'
			}
		}
	}).mount({ AsNavFor: AsNavFor });
}
if (document.querySelector('.slider__testimonial-center')) {
	const sliderTestimonialCentered = new Splide('.slider__testimonial-center', {
		type: 'loop',
		width: '100%',
		perPage: 1,
		perMove: 1,
		gap: '30px',
		drag: true,
		arrows: true,
		pagination: false
	}).mount();
}
if (document.querySelector('.slider__testimonial-long')) {
	const sliderTestimonialLong = new Splide('.slider__testimonial-long', {
		type: 'loop',
		width: '100%',
		perPage: 1,
		perMove: 1,
		gap: '30px',
		drag: true,
		arrows: true,
		pagination: false
	}).mount();
}
if (document.querySelector('#slider7')) {
	const sliderTestimonialLong2 = new Splide('#slider7', {
		type: 'loop',
		width: '100%',
		perPage: 1,
		perMove: 1,
		gap: '30px',
		drag: true,
		arrows: true,
		pagination: false
	}).mount();
}
if (document.querySelector('#slider8')) {
	const sliderThreeCards = new Splide('#slider8', {
		type: 'loop',
		width: '100%',
		perPage: 3,
		perMove: 3,
		gap: '30px',
		drag: true,
		arrows: true,
		pagination: false,
		breakpoints: {
			992: {
				// fixedWidth: '350px',
				perPage: '2',
				perMove: '2',
				gap: 'clamp(16px, calc(1rem + ((1vw - 5.6px) * 3.2407)), 30px)'
			},
			560: {
				// fixedWidth: '350px',
				perPage: 1,
				perMove: 1,
				fixedWidth: '90%',
				gap: '20px'
			}
		}
	}).mount();
}
if (document.querySelector('.fiveStepsSlider')) {
	const fiveStepsSlider = new Splide('.fiveStepsSlider', {
		type: 'slide',
		width: '100%',
		startAt: 0,
		perPage: 2,
		perMove: 1,
		rewind: true,
		rewindByDrag: true,
		flickMaxPages: 1,
		flickPower: 50,
		drag: true,
		gap: '30px',
		arrows: false,
		pagination: true,
		classes: {
			pagination: 'splide__pagination slider-dots',
			page: 'splide__pagination__page slider-dot',
			arrows: 'splide__arrows slider__arrows',
			arrow: 'splide__arrow slider__arrow',
			prev: 'splide__arrow--prev slider__arrow--prev',
			next: 'splide__arrow--next slider__arrow--next'
		},
		breakpoints: {
			992: {
				gap: 'clamp(16px, calc(1rem + ((1vw - 5.6px) * 3.2407)), 30px)'
			},
			560: {
				perPage: 1,
				perMove: 1,
				fixedWidth: '80%'
			},
			360: {
				perPage: 1,
				perMove: 1,
				fixedWidth: '100%'
			}
		}
	}).mount({ FiveStepsSliderBehavior: FiveStepsSliderBehavior });
}

const featuresSliders = () => {
	if (document.querySelector('.feature__slider')) {
		const sliders = document.querySelectorAll('.feature__slider');
		sliders.forEach((slider) => {
			const featureSlider = new Splide(slider, {
				type: 'loop',
				width: '100%',
				perPage: 1,
				perMove: 1,
				gap: '30px',
				drag: true,
				arrows: false,
				pagination: true,
				classes: {
					pagination: 'splide__pagination slider-dots',
					page: 'splide__pagination__page slider-dot'
				}
			}).mount();
		});
	}
};

featuresSliders();

// Different fiveStepsSlider options

const FiveStepsSliderBehavior1 = function (Splide, Components, options) {
	const Component = {
		mount() {
			this.fiveStepsSliderBehavior1();
		},
		fiveStepsSliderBehavior1 () {
			const isHovered = (element) => {
				return element.parentElement.querySelector(':hover') === element;
			};
			// console.log(Splide)
			// console.log(Components)
			const slides = [...Splide.Components.Slides.get()];
			// console.log(slides)
			// When the slider moves, open the active slide and close the others
			Splide.on('moved', (newIndex) => {
				const activeSlide = Splide.Components.Slides.getAt(newIndex);
				const activeCard = activeSlide.slide.firstElementChild;
				const otherSlides = [...Splide.Components.Slides.get()].filter((slide) => { return slide !== activeSlide; });
				const cardToggle = activeCard.querySelector('.clickUp-toggle');
				setTimeout(() => {
					console.log('waited a second')
					activeCard.setAttribute('data-state', 'opened');
					cardToggle.firstElementChild.classList.replace('fa-plus', 'fa-xmark');
				}, 500);
				otherSlides.forEach((slide) => {
					slide.slide.firstElementChild.setAttribute('data-state', 'closed');
					slide.slide.querySelector('.clickUp-toggle').firstElementChild.classList.replace('fa-xmark', 'fa-plus');
				});
			});
			slides.forEach(slide => {
				const card = slide.slide.firstElementChild;
				const cardToggle = card.querySelector('.clickUp-toggle');
				const sliderArrows = card.querySelector('.slider-arrows');
				slide.slide.addEventListener('click', () => {
					//If the slide is opened and the user clicks on the card, close it
					if (card.getAttribute('data-state') === 'opened' && !isHovered(sliderArrows) && !isHovered(cardToggle)) {
						card.setAttribute('data-state', 'closed');
						cardToggle.firstElementChild.classList.replace('fa-xmark', 'fa-plus');
					}
					// If the slide is closed and the user clicks on the card, open it
					else if (card.getAttribute('data-state') === 'closed' && !isHovered(sliderArrows) && !isHovered(cardToggle)) {
						card.setAttribute('data-state', 'opened');
						cardToggle.firstElementChild.classList.replace('fa-plus', 'fa-xmark');
					}
					if (!isHovered(sliderArrows) && !isHovered(cardToggle)) {
						Splide.go(slide.index);
					}
				});
				cardToggle.addEventListener('click', () => {
					console.log('toggle clicked')
					Splide.go(slide.index);
				});
				sliderArrows.addEventListener('click', () => {
					console.log('arrow clicked')
					Splide.go('>');
				});
			})
			
		}
	};
	return Component;
};

const TogglePulse = function (Splide, Components, options) {
	const Component = {
		mount () {
			this.togglePulse();
		},
		togglePulse () {
			function isTouchDevice(){
				return true == ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
			}
			
			if(isTouchDevice()===true) {
				alert('Touch Device'); //your logic for touch device
			}
			else {
				alert('Not a Touch Device'); //your logic for non touch device
			}
			//When the elements are in the viewport, add the class pulse 
			const isHovered = (element) => {
				return element.parentElement.querySelector(':hover') === element;
			};
			const allToggles = Splide.root.querySelectorAll('.clickUp-toggle');
				console.log(allToggles)
			const slides = [...Splide.Components.Slides.get()];
			slides.forEach(slide => {
				const card = slide.slide.firstElementChild;
				const cardToggle = card.querySelector('.clickUp-toggle');
				let options = {
					root: null,
					rootMargin: '0px',
					threshold: 1.0
				}
				const callback = (entries, observer) => {
					entries.forEach(entry => {
						if (entry.isIntersecting ) {
							cardToggle.classList.add('pulse-initial');
						} else {
							cardToggle.classList.remove('pulse-initial');
						}
					});
				}
				let observer = new IntersectionObserver(callback, options); 
				let target = cardToggle;
				observer.observe(target);
				//For each card, on hover add the toggle the class pulse to the toggle
				card.addEventListener('mouseenter', () => {
					console.log('mouse entered')
					allToggles.forEach(toggle => toggle.classList.remove('pulse-initial') )
					cardToggle.classList.add('pulse-faster');
					
				})
				card.addEventListener('mouseleave', () => {
					cardToggle.classList.remove('pulse-faster');
					allToggles.forEach(toggle => toggle.classList.add('pulse-initial') )
				})
			});

		}
	}
	return Component;
}

if(document.getElementById('option1')) {
	const fiveStepsSlider = new Splide('#option1', {
		type: 'slide',
		width: '100%',
		startAt: 0,
		perPage: 2,
		perMove: 1,
		rewind: true,
		rewindByDrag: true,
		flickMaxPages: 1,
		flickPower: 50,
		drag: true,
		gap: '30px',
		arrows: false,
		pagination: true,
		classes: {
			pagination: 'splide__pagination slider-dots',
			page: 'splide__pagination__page slider-dot',
			arrows: 'splide__arrows slider__arrows',
			arrow: 'splide__arrow slider__arrow',
			prev: 'splide__arrow--prev slider__arrow--prev',
			next: 'splide__arrow--next slider__arrow--next'
		},
		breakpoints: {
			992: {
				gap: 'clamp(16px, calc(1rem + ((1vw - 5.6px) * 3.2407)), 30px)'
			},
			560: {
				perPage: 1,
				perMove: 1,
				fixedWidth: '80%'
			},
			360: {
				perPage: 1,
				perMove: 1,
				fixedWidth: '100%'
			}
		}
	}).mount({ FiveStepsSliderBehavior: FiveStepsSliderBehavior });

}

if(document.getElementById('option2')) {
	const fiveStepsSlider = new Splide('#option2', {
		type: 'slide',
		width: '100%',
		startAt: 0,
		perPage: 2,
		perMove: 1,
		rewind: true,
		rewindByDrag: true,
		flickMaxPages: 1,
		flickPower: 50,
		drag: true,
		gap: '30px',
		arrows: false,
		pagination: true,
		classes: {
			pagination: 'splide__pagination slider-dots',
			page: 'splide__pagination__page slider-dot',
			arrows: 'splide__arrows slider__arrows',
			arrow: 'splide__arrow slider__arrow',
			prev: 'splide__arrow--prev slider__arrow--prev',
			next: 'splide__arrow--next slider__arrow--next'
		},
		breakpoints: {
			992: {
				gap: 'clamp(16px, calc(1rem + ((1vw - 5.6px) * 3.2407)), 30px)'
			},
			560: {
				perPage: 1,
				perMove: 1,
				fixedWidth: '80%'
			},
			360: {
				perPage: 1,
				perMove: 1,
				fixedWidth: '100%'
			}
		}
	}).mount({ FiveStepsSliderBehavior: FiveStepsSliderBehavior });

}

// if(document.getElementById('option3')) {
// 	const fiveStepsSlider = new Splide('#option3', {
// 		type: 'slide',
// 		width: '100%',
// 		startAt: 0,
// 		perPage: 2,
// 		perMove: 1,
// 		rewind: true,
// 		rewindByDrag: true,
// 		flickMaxPages: 1,
// 		flickPower: 50,
// 		drag: true,
// 		gap: '30px',
// 		arrows: false,
// 		pagination: true,
// 		classes: {
// 			pagination: 'splide__pagination slider-dots',
// 			page: 'splide__pagination__page slider-dot',
// 			arrows: 'splide__arrows slider__arrows',
// 			arrow: 'splide__arrow slider__arrow',
// 			prev: 'splide__arrow--prev slider__arrow--prev',
// 			next: 'splide__arrow--next slider__arrow--next'
// 		},
// 		breakpoints: {
// 			992: {
// 				gap: 'clamp(16px, calc(1rem + ((1vw - 5.6px) * 3.2407)), 30px)'
// 			},
// 			560: {
// 				perPage: 1,
// 				perMove: 1,
// 				fixedWidth: '80%'
// 			},
// 			360: {
// 				perPage: 1,
// 				perMove: 1,
// 				fixedWidth: '100%'
// 			}
// 		}
// 	}).mount({ FiveStepsSliderBehavior1: FiveStepsSliderBehavior1 });

// }

if(document.getElementById('option4')) {
	const fiveStepsSlider = new Splide('#option4', {
		type: 'loop',
		width: '100%',
		startAt: 0,
		perPage: 2,
		perMove: 1,
		rewind: true,
		rewindByDrag: true,
		flickMaxPages: 1,
		flickPower: 50,
		drag: true,
		gap: '30px',
		arrows: true,
		pagination: false,
		classes: {
			pagination: 'splide__pagination slider-dots',
			page: 'splide__pagination__page slider-dot',
			arrows: 'splide__arrows slider__arrows',
			arrow: 'splide__arrow slider__arrow',
			prev: 'splide__arrow--prev slider__arrow--prev',
			next: 'splide__arrow--next slider__arrow--next'
		},
		breakpoints: {
			992: {
				gap: 'clamp(16px, calc(1rem + ((1vw - 5.6px) * 3.2407)), 30px)'
			},
			560: {
				perPage: 1,
				perMove: 1,
				fixedWidth: '80%'
			},
			360: {
				perPage: 1,
				perMove: 1,
				fixedWidth: '100%'
			}
		}
	}).mount({ FiveStepsSliderBehavior1: FiveStepsSliderBehavior1, TogglePulse: TogglePulse });

}

