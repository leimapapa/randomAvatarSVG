const avatar = (function () {
	const make = () => {
		const rando = (min, max) => {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		};

		const makeID = (length) => {
			let result = "";
			const characters =
				"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			const charactersLength = characters.length;
			for (let i = 0; i < length; i++) {
				result += characters.charAt(Math.floor(Math.random() * charactersLength));
			}
			return result;
		};

		let R2R = rando(-50, 50) / 10;
		let G2R = rando(-50, 50) / 10;
		let B2R = rando(-50, 50) / 10;
		let A2R = rando(-50, 50) / 10;
		let ROff = rando(-50, 50) / 10;
		let R2G = rando(-50, 50) / 10;
		let G2G = rando(-50, 50) / 10;
		let B2G = rando(-50, 50) / 10;
		let A2G = rando(-50, 50) / 10;
		let GOff = rando(-50, 50) / 10;
		let R2B = rando(-50, 50) / 10;
		let G2B = rando(-50, 50) / 10;
		let B2B = rando(-50, 50) / 10;
		let A2B = rando(-50, 50) / 10;
		let BOff = rando(-50, 50) / 10;
		let R2A = rando(-50, 50) / 10;
		let G2A = rando(-50, 50) / 10;
		let B2A = rando(-50, 50) / 10;
		let A2A = rando(-50, 50) / 10;
		let AOff = rando(-50, 50) / 10;
		let extraBF = "";
		let extraBFProb = rando(0, 100);
		//80% of the time only have 1 baseFrequency
		if (extraBFProb > 80) {
			extraBF = " " + rando(1, 10000) / 100000;
		}
		let bfRand = rando(1, 10000) / 100000 + extraBF;
		let randOct = rando(1, 10);
		let svgId = makeID(10);
		let randSeed = rando(0, 1000);
		let rRand = rando(0, 255);
		let gRand = rando(0, 255);
		let bRand = rando(0, 255);
		let rRand2 = Math.floor(255 - Math.abs(rRand));
		let gRand2 = Math.floor(255 - Math.abs(gRand));
		let bRand2 = Math.floor(255 - Math.abs(bRand));

		let rgb = `rgb(${rRand},${gRand},${bRand})`;
		let rgb2 = `rgb(${rRand2},${gRand2},${bRand2})`;
		let randFillVals = [
			rgb,
			rgb2,
			`url(#gradient-${svgId})`,
			`url(#gradient-${svgId})`
		];

		let randFill = randFillVals[rando(0, randFillVals.length - 1)];

		let grads = ["radial", "linear", "linear", "linear"];
		let gradType = grads[rando(0, grads.length - 1)];
		let randRot = rando(0, 360);

		let animated = `<feColorMatrix class="anim" type="hueRotate" values="0">
			<animate attributeName="values" from="0" to="360" dur="${rando(2, 10)}s" repeatCount="indefinite" />
		</feColorMatrix>`;

		//make 20% static
		if (rando(1, 5) === 5) {
			animated = "";
		}

		//33% have no lighting
		let lighting = "";
		let gradient = "";

		if (randFill == `url(#gradient-${svgId})`) {
			gradient = `<${gradType}Gradient id="gradient-${svgId}"  gradientTransform="rotate(${randRot})">
      <stop offset="0%" stop-color="${rgb}" />
      <stop offset="100%" stop-color="${rgb2}" />
    </${gradType}Gradient>`;
		}

		let randLuz = rando(0, 2);

		//33% have diffuse lighting
		if (randLuz === 1) {
			lighting = `<feDiffuseLighting lighting-color="${rgb}" surfaceScale="${rando(1, 10)}">
			<feDistantLight azimuth="${rando(0, 180)}" elevation="${rando(0, 180)}" />
		</feDiffuseLighting>`;
			//33% have specular lighting
		} else if (randLuz == 2) {
			lighting = `<feSpecularLighting result="specOut"
        specularExponent="${rando(10, 100)}" lighting-color="${rgb}">
      <fePointLight x="${rando(0, 1000)}" y="${rando(0, 1000)}" z="${rando(
				1,
				100
			)}"/>
    </feSpecularLighting>`;
		}

		//create the svg
		let svg = `<svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%">
	<defs>
		${gradient}
    <filter id="filter-${svgId}">
        <feTurbulence baseFrequency="${bfRand}" numOctaves="${randOct}" seed="${randSeed}"/>
				${animated}
        <feColorMatrix values="${R2R} ${G2R} ${B2R} ${A2R} ${ROff} ${R2G} ${G2G} ${B2G} ${A2G} ${GOff} ${R2B} ${G2B} ${B2B} ${A2B} ${BOff} ${R2A} ${G2A} ${B2A} ${A2A} ${AOff}"/>
				${lighting}
				<feComposite operator="in" in2="SourceGraphic" />
		</filter>
		</defs>
    <rect height="100%" width="100%" x="0%" y="0%" fill="${randFill}" class="bgRect"/>
    <rect height="100%" width="100%" x="0%" y="0%" filter="url(#filter-${svgId})"/>
	</svg>
	`;
		return svg;
	};

	return {
		make
	};
})();
