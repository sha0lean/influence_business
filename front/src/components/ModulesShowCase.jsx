import React, { useState, useEffect } from 'react';

function ModulesShowCase() {
	const [activeTab, setActiveTab] = useState('');

	useEffect(() => {
		const tabLinks = document.querySelectorAll('.tablinks');
		const tabContent = document.querySelectorAll('.tabcontent');
		tabLinks.forEach((el) => {
			el.addEventListener('click', openTabs);
		});

		function openTabs(el) {
			const btnTarget = el.currentTarget;
			const mod = btnTarget.dataset.mod;

			tabContent.forEach((el) => {
				el.classList.remove('active');
			});

			tabLinks.forEach((el) => {
				el.classList.remove('active');
			});

			document.querySelector(`#${mod}`).classList.add('active');

			btnTarget.classList.add('active');
		}
	}, []);

	return (
		<section id="wrapper">
			<div class="content">
				<div class="tabs">
					<button class="tablinks active" data-mod="ModuleOne">
						<p data-title="1">
							Renforcement Personnel
						</p>
					</button>
					<button class="tablinks" data-mod="ModuleTwo">
						<p data-title="2">
							Stratégie
						</p>
					</button>
					<button class="tablinks" data-mod="ModuleThree">
						<p data-title="3">
							Marketing
						</p>
					</button>
					<button class="tablinks" data-mod="ModuleFour">
						<p data-title="4">
							Communication
						</p>
					</button>
					<button class="tablinks" data-mod="ModuleFive">
						<p data-title="5">
							Fincancement
						</p>
					</button>
				</div>

				<div class="wrapper_tabcontent">
					<div id="ModuleOne" class="tabcontent active">
						<h3>Renforcement Personnel</h3>
						<p>
							Le module sur le renforcement personnel est un programme conçu pour aider les personnes à améliorer leur bien-être et à atteindre leurs objectifs en utilisant différentes techniques de développement personnel. Il peut comprendre des éléments tels que la visualisation, la méditation, la gestion du stress, la communication efficace, l'organisation et la gestion du temps, ainsi que l'atteinte de l'équilibre entre la vie personnelle et professionnelle.
						</p>
					</div>

					<div id="ModuleTwo" class="tabcontent">
						<h3>Stratégie d’entreprise
						</h3>
						<p>Le module sur la stratégie d'entreprise a pour but d'aider les entreprises à définir et mettre en œuvre une stratégie efficace pour atteindre leurs objectifs à long terme. Il peut inclure l'analyse de l'environnement économique et concurrentiel, la définition de la mission, des valeurs et des objectifs, l'identification des forces et des faiblesses, la détermination de la cible de clientèle et de la stratégie de marketing, ainsi que la planification des ressources nécessaires.
						</p>
					</div>

					<div id="ModuleThree" class="tabcontent">
						<h3>Influencer Marketing</h3>
						<p>
							Le module sur l'influencer marketing est destiné aux entreprises souhaitant utiliser les influenceurs pour promouvoir leurs produits ou services. Il peut inclure des éléments tels que la recherche et le choix des influenceurs pertinents, la négociation et la mise en place de partenariats avec eux, la création de contenu de qualité pour les réseaux sociaux et la mesure de l'efficacité de la campagne d'influencer marketing.
						</p>
					</div>

					<div id="ModuleFour" class="tabcontent">
						<h3>Communication Digitale et physique</h3>
						<p>
							Le module sur la communication digitale et physique est destiné aux personnes souhaitant améliorer leur utilisation des moyens de communication numérique et physique dans leur vie professionnelle ou personnelle. Il peut inclure des éléments tels que l'utilisation des emails, des réseaux sociaux et des messages instantanés, la préparation et la présentation de documents et de présentations, la communication en face à face et la gestion des conflits.
						</p>
					</div>
					<div id="ModuleFive" class="tabcontent">
						<h3>Fincancement</h3>
						<p>
							Le module sur le financement est destiné aux entreprises et aux individus souhaitant obtenir des fonds pour leur projet ou leur activité. Il peut inclure des éléments tels que la recherche de financement, la préparation de documents de demande de financement, la négociation avec les investisseurs et les banques, ainsi que la gestion des fonds une fois obtenus.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

export default ModulesShowCase;