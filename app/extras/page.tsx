import ExtrasClient from '../extras-client';

export default async function Page() {
	return (
		<div className='pt-(--nav-height)'>
			<ExtrasClient />
		</div>
	);
}
