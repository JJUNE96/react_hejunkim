import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
function Joy() {
	return (
		<article className='joy'>
			{/* <div className='quote'>
				<FontAwesomeIcon icon={faQuoteLeft}>{faQuoteLeft}</FontAwesomeIcon>
			</div> */}
			<h2>
				“I WONDER WHAT IT WOULD BE <br />
				LIKE TO LIVE IN A WORLD WHERE IT WAS
				<br /> ALWAYS JUNE.”
			</h2>

			<p>ANNE OF THE ISLAND</p>
		</article>
	);
}

export default Joy;
