import React, { useContext, useState, useRef, useEffect } from 'react';
import {
  FlatList,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
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

import { searchAnime } from '~/services/api';

const Search: React.FC = () => {
  const [searchResult, setSearchResult] = useState<Anime[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchNotFound, setSearchNotFound] = useState(false);
  const searchInputRef = useRef<TextInput>(null);
  const theme = useContext(ThemeContext);

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
            const response = await searchAnime(searchText);

            if (!response) {
              setSearchResult([]);
              setSearchNotFound(true);
            } else setSearchResult(response || []);
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
    </Background>
  );
};

export default Search;
