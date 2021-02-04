import { inject, observer } from 'mobx-react';
import React, { useState, useCallback } from 'react';
import { SafeAreaView, View, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import { IStore } from '../../stores';
import { Table } from '../../components/table';
import { useFocusEffect } from '@react-navigation/native';

interface IProps {
    store?: IStore;
}

const QuotesScreen = (props: IProps) => {
    const { store } = props;

    const [firstLoading, setFirstLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);

    useFocusEffect(useCallback(() => {
        const fetchTickers = async () => {
            try {
                await store?.quotes.returnTicker();
                setFirstLoading(false);
            } catch (error) {
                setHasError(true);
                setFirstLoading(false);
            }
        };
        fetchTickers();

        const intervalId = setInterval(async () => {
            await fetchTickers();
        }, 5000);
        return () => {
            clearInterval(intervalId);
            setFirstLoading(true);
        }
    }, []))

    const data = store?.quotes.list_tickers

    return (
        <SafeAreaView style={styles.container}>
            {firstLoading 
                ? <View style={styles.loading}><ActivityIndicator size="large" color="black"/></View>
                : <Table 
                    keys={['last', 'highestBid', 'percentChange']}
                    data={data}
                    hasError={hasError}
                />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default inject('store')(observer(QuotesScreen))