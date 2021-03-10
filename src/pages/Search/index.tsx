import React, { useContext, useState, useRef, useEffect } from 'react';
import {
  FlatList,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { ThemeContext } from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import { PageTitle, Text } from '~/components/Text';

import {
  SearchContainer,
  SearchInput,
  SearchInputClear,
  AnimeComponent,
  NotFoundContainer,
} from './styles';

import { searchAnime, getAnimeByCategory } from '~/services/api';

const Search: React.FC = () => {
  const [searchResult, setSearchResult] = useState<Anime[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchNotFound, setSearchNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchInputRef = useRef<TextInput>(null);
  const theme = useContext(ThemeContext);
  const { params } = useRoute<RouteProp<SearchRouteParams, 'Search'>>();

  useEffect(() => {
    async function getAnimesByCat() {
      if (params?.category) {
        const response = await getAnimeByCategory(params.category);

        setSearchResult(response || []);
        setLoading(false);
      }
    }

    if (params?.category) {
      setLoading(true);
      setSearchText('');
      setSearchNotFound(false);
      setSearchResult([]);
      setSearchText(`categoria: ${params?.category}`);
    }
    getAnimesByCat();
  }, [params]);

  return (
    <Background>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <PageTitle style={{ padding: 15, fontSize: 20 }}>Buscar</PageTitle>
      </TouchableWithoutFeedback>
      <SearchContainer>
        <SearchInput
          ref={searchInputRef}
          placeholder="Pesquisar..."
          placeholderTextColor={`${theme.textColor}90`}
          selectionColor={theme.textColor}
          value={searchText}
          onChangeText={(newValue) => {
            setSearchNotFound(false);

            setSearchText(newValue);
          }}
          returnKeyType="send"
          onSubmitEditing={async () => {
            setLoading(true);
            const response = await searchAnime(searchText);

            if (!response) {
              setSearchResult([]);
              setSearchNotFound(true);
            } else setSearchResult(response || []);

            setLoading(false);
          }}
        />
        {!!searchText && (
          <SearchInputClear
            onPress={() => {
              setSearchText('');
              setSearchNotFound(false);
              setSearchResult([]);

              searchInputRef.current?.focus();
            }}>
            <Icon name="close" size={25} color={theme.textColor} />
          </SearchInputClear>
        )}
      </SearchContainer>
      {loading ? (
        <NotFoundContainer>
          <ActivityIndicator color={theme.textColor} size={75} />
        </NotFoundContainer>
      ) : (
        <>
          {searchNotFound && (
            <NotFoundContainer>
              <Text>{`Nada encontrado na busca por "${searchText}"`}</Text>
            </NotFoundContainer>
          )}
          <FlatList
            contentContainerStyle={{
              padding: 10,
              alignItems: 'center',
            }}
            style={{
              flex: 1,
              marginTop: 15,
            }}
            data={searchResult}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item }) => (
              <AnimeComponent
                isAnime
                cover={item.category_image}
                title={item.category_name}
                animeId={item?.id}
              />
            )}
          />
        </>
      )}
    </Background>
  );
};

export default Search;
