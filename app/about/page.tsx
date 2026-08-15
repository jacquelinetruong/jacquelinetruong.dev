import AboutClient from '../about-client';
import { getExperience } from '@/lib/getExperience';

export default async function Page() {
	const experience = await getExperience();
	const currentXP = experience.filter(e => e.category === 'work' && e.current === true);
	const skills = experience.filter(e => e.category === 'proficiencies');

	return (
		<div className='pt-(--nav-height)'>
			<AboutClient
				experience={experience}
				currentXP={currentXP}
				skills={skills}
			/>
		</div>
	);
}

export const revalidate = 60;
