import Image from 'next/image';

import classes from './hero.module.css';

function Hero() {
	return (
		<section className={classes.hero}>
			<div className={classes.image}>
        <Image src="/images/site/john.jpg" alt="An image of Luke" width={300} height={300}/>
      </div>
      <h1>Hi, I'm Long John!</h1>
      <p>Let me tell you all about my life as a stuffed puppy and frameworks too!</p>
		</section>
	);
}

export default Hero;
