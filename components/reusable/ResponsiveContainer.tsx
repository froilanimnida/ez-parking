import { ScrollView, View, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import PlatformType from '@/lib/platform';
import ButtonComponent from '../ButtonComponent';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import TextComponent from '../TextComponent';

const AppBanner = () => {
	const [isVisible, setIsVisible] = useState(true);

	if (!isVisible) return null;

	return (
		<View
			style={{
				width: '100%',
				backgroundColor: '#f0f9ff',
				borderBottomWidth: 1,
				borderBottomColor: '#bae6fd',
				padding: 12,
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'space-between',
			}}>
			<View
				style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
				<MaterialCommunityIcons
					name='android'
					size={24}
					color='#0284c7'
				/>
				<TextComponent
					style={{ marginLeft: 12, color: '#0284c7', flex: 1 }}>
					Get the EZ Parking mobile app for a better experience!
				</TextComponent>
			</View>

			<View
				style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
				<ButtonComponent
					onPress={() => {
						window.open(
							'https://pub-ef0b2653960949e0964eb3f879f4d5e7.r2.dev/app-release.apk',
						);
						alert('To be implemented');
					}}
					title='Download'
					variant='secondary'
					size='sm'
				/>

				<ButtonComponent onPress={() => setIsVisible(false)}>
					<MaterialCommunityIcons
						name='close'
						size={20}
						color='#64748b'
					/>
				</ButtonComponent>
			</View>
		</View>
	);
};

interface ResponsiveContainerProps {
	children: React.ReactNode;
}

const ResponsiveContainer = ({ children }: ResponsiveContainerProps) => {
	return (
		<SafeAreaView
			style={{ flex: 1, height: '100%' }}
			edges={
				PlatformType() === 'web'
					? ['left', 'right']
					: ['left', 'right', 'bottom', 'top']
			}>
			{PlatformType() === 'web' && <AppBanner />}
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={PlatformType() === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={PlatformType() === 'ios' ? 64 : 0}>
				<ScrollView
					contentContainerStyle={{
						flexGrow: 1,
						paddingVertical: 32,
						alignItems: 'center',
						...(PlatformType() === 'web' && {
							display: 'flex',
							flex: 1,
						}),
					}}
					keyboardShouldPersistTaps='handled'
					showsVerticalScrollIndicator={false}>
					<View
						style={{
							width: '100%',
							maxWidth: 1536,
							paddingHorizontal: 16,
							...(PlatformType() === 'web' && {
								flex: 1,
							}),
						}}>
						{children}
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default ResponsiveContainer;
