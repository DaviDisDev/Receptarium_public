import { NavigationContainer } from '@react-navigation/native';

const CustomNavigationContainer = ({ children }) => {
    const navigationRef = React.useRef(null);

    React.useEffect(() => {
        const unsubscribe = navigationRef.current.addListener('beforeRemove', (e) => {
            e.preventDefault();
            Alert.alert(
                'Discard changes?',
                'You have unsaved changes. Are you sure to discard them and leave the screen?',
                [
                    { text: "Don't leave", style: 'cancel', onPress: () => { } },
                    {
                        text: 'Discard',
                        style: 'destructive',
                        onPress: () => navigationRef.current.dispatch(e.data.action),
                    },
                ]
            );
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return <NavigationContainer ref={navigationRef}>{children}</NavigationContainer>;
};

export default CustomNavigationContainer;