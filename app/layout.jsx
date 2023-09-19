import Nav from '@components/Nav';
import Provider from '@components/Provider';
import '@styles/globals.css';

export const metadata = {
	title: 'Next JS || Practice Application',
	Description:
		'This is  a simple  Prototyped JS application that is built for practice',
};

const RootLayout = ({ children }) => {
	return (
		<html lang='en'>
			<body>
				<Provider>
					<div className='main'>
						<div className='gradient'></div>
					</div>
					<main className='app'>
						<Nav />
						{children}
					</main>
				</Provider>
			</body>
		</html>
	);
};

export default RootLayout;
