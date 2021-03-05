import React from 'react';
import { FlatList } from 'react-native';

import Background from '~/components/Background';
import { PageTitle } from '~/components/Text';

import { CategoryContainer, CategoryName } from './styles';

import global from '~/global';

const Categories: React.FC = () => {
  return (
    <Background>
      <PageTitle style={{ padding: 15, fontSize: 20 }}>Categorias</PageTitle>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 10 }}
        data={global.categories}
        keyExtractor={({ searchName }) => searchName}
        numColumns={2}
        renderItem={({ item }) => (
          <CategoryContainer>
            <CategoryName>{item.displayName}</CategoryName>
          </CategoryContainer>
        )}
      />
    </Background>
  );
};

export default Categories;
