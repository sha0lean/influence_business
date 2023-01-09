import React, { useState, useEffect } from 'react';

function WordFlick() {
	const words = ['"We believe in the power of community to improve your business."', '“The best way to predict the future is to create it.”', '“Logic will get you from A to B. Imagination will take you everywhere.”', '“As long as you’re going to be thinking anyway, think big.”', '“Success is walking from failure to failure with no loss of enthusiasm.”', '”Genius is 1% inspiration, and 99% perspiration.”', '“If you cannot do great things, do small things in a great way.”', "“Oui je m'y suis pris un peu tard...”", "“Oui je suis fatigué.”", '“Success is walking from failure to failure with no loss of enthusiasm.”', '”Genius is 1% inspiration, and 99% perspiration.”', '“If you cannot do great things, do small things in a great way.”', "“Oui je m'y suis pris un peu tard...”", "“Oui je suis fatigué.”", "Si si j'aime la vie !", '“The best way to predict the future is to create it.”', '“Logic will get you from A to B. Imagination will take you everywhere.”'];
	const [part, setPart] = useState('');
	const [i, setI] = useState(0);
	const [offset, setOffset] = useState(0);
	const len = words.length;
	const [forwards, setForwards] = useState(true);
	const [skipCount, setSkipCount] = useState(0);
	const skipDelay = 30;
	const speed = 70;

	useEffect(() => {
		const interval = setInterval(() => {
			if (forwards) {
				if (offset >= words[i].length) {
					setSkipCount(skipCount + 1);
					if (skipCount == skipDelay) {
						setForwards(false);
						setSkipCount(0);
					}
				}
			} else {
				if (offset == 0) {
					setForwards(true);
					setI(i + 1);
					setOffset(0);
					if (i >= len) {
						setI(0);
					}
				}
			}
			setPart(words[i].substr(0, offset));
			if (skipCount == 0) {
				if (forwards) {
					setOffset(offset + 1);
				} else {
					setOffset(offset - 1);
				}
			}
		}, speed);
		return () => clearInterval(interval);
	}, [forwards, i, offset, part, skipCount, speed]);

	return <div className="word">{part}</div>;
}

export default WordFlick;
