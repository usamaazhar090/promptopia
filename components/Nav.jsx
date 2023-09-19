'use client';
import Image from 'next/image';
import Link from 'next/link';
import { getProviders, signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const Nav = () => {
	const { data: session } = useSession();

	const [providers, setProviders] = useState(null);
	const [toggleDropdown, setToggleDropdown] = useState(false);

	useEffect(() => {
		const func = async () => {
			const res = await getProviders();
			setProviders(res);
		};
		func();
	}, []);

	return (
		<nav className='flex-between w-full mb-16 pt-3'>
			<Link
				href='/'
				className='flex gap-2 flex-center'>
				<Image
					src='/assets/images/logo.svg'
					alt='Promptia Logo'
					width={30}
					height={30}
					className='object-contain'
				/>
				<p className='logo_text'>Promptopia</p>
			</Link>

			{/* Desktop Navigation */}
			<div className='hidden sm:flex'>
				{session?.user ? (
					<div className='flex gap-3 md:gap-5'>
						<Link
							href='create-prompt'
							className='black_btn'>
							Create Post
						</Link>
						<button
							className='outline_btn'
							onClick={signOut}
							type='button'>
							Sign Out
						</button>
						<Link href={'/profile'}>
							<Image
								src={session?.user.image}
								height={37}
								width={37}
								alt='profile image'
								className=' rounded-full'
							/>
						</Link>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type='button'
									key={provider.name}
									onClick={() => signIn(provider.id)}
									className='black_btn'>
									Sign In
								</button>
							))}
					</>
				)}
			</div>

			{/* Mobile Navigation */}
			<div className='flex sm:hidden relative'>
				{session?.user ? (
					<div className='flex '>
						<Image
							src={session?.user.image}
							height={37}
							width={37}
							className=' rounded-full'
							alt='profile image'
							onClick={() => {
								setToggleDropdown((prev) => !prev);
							}}
						/>
						{toggleDropdown && (
							<div className='dropdown'>
								<Link
									href='/profile'
									className='dropdown_link'
									onClick={() => setToggleDropdown(false)}>
									My Profile
								</Link>
								<Link
									href='/create-prompt'
									className='dropdown_link'
									onClick={() => setToggleDropdown(false)}>
									Create Prompt
								</Link>
								<button
									className='black_btn mt-5 w-full'
									onClick={() => {
										setToggleDropdown(false);
										signOut();
									}}
									type='button'>
									Sign Out
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type='button'
									key={provider.name}
									onClick={() => signIn(provider.id)}
									className='black_btn'>
									Sign In
								</button>
							))}
					</>
				)}
			</div>
		</nav>
	);
};

export default Nav;
