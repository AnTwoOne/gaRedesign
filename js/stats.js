
gsap.registerPlugin(ScrollTrigger);

const stats = document.querySelectorAll('.stat-container');

const statsIncrease = (stat) => {
    const statNum = stat.querySelector('.stats-number');
    const statDonut = stat.querySelector('.animated-donut');
    const targetNum = statDonut.getAttribute('data-percent');
    const statAnimatedCircle = stat.querySelector('.circle-chart__circle')
    console.log(statAnimatedCircle)
    const statCircleCircumference = statAnimatedCircle.getAttribute('r') * 2 * Math.PI;

    let startCount = 0,
    num = {var:startCount};
    gsap.timeline({
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top bottom",
          end: "bottom center ", 
          scrub: 0.5, 
          }
        })
        .to(num, {var: targetNum, duration: 5, ease:"ease", onUpdate:changeNumber})
        .to({}, {duration:2})

        function changeNumber() {
            statNum.innerHTML = `${((num.var).toFixed())}%`;
            statAnimatedCircle.setAttribute('stroke-dasharray', `${(statCircleCircumference / 100) * (num.var).toFixed()} ,${statCircleCircumference}`)
            }

}

stats.forEach(stat => {
    statsIncrease(stat);
})
