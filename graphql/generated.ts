import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type ListInput = {
  game?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type Lists = {
  __typename?: 'Lists';
  game?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type MultiResult = {
  __typename?: 'MultiResult';
  rowsAffected: Scalars['Int'];
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createList: Lists;
  createTiers: MultiResult;
  deleteList: MultiResult;
  deleteTiers: MultiResult;
  updateMultiTiers: MultiResult;
  updateTiersById: Tiers;
};


export type MutationCreateListArgs = {
  input: ListInput;
};


export type MutationCreateTiersArgs = {
  input: Array<TierInput>;
};


export type MutationDeleteListArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteTiersArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateMultiTiersArgs = {
  input: Array<TierInput>;
};


export type MutationUpdateTiersByIdArgs = {
  input: TierInput;
};

export type Query = {
  __typename?: 'Query';
  getAllTiers: Array<Tiers>;
  getList?: Maybe<Lists>;
  getLists: Array<Lists>;
  getTier?: Maybe<Tiers>;
  getTiers: Array<Tiers>;
};


export type QueryGetAllTiersArgs = {
  listId: Scalars['Int'];
};


export type QueryGetListArgs = {
  id: Scalars['Int'];
};


export type QueryGetTierArgs = {
  id: Scalars['Int'];
};

export type TierInput = {
  game: Scalars['String'];
  hori?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  image?: InputMaybe<Scalars['String']>;
  kind?: InputMaybe<Scalars['String']>;
  listId?: InputMaybe<Scalars['Int']>;
  role?: InputMaybe<Scalars['String']>;
  tier: Scalars['String'];
  title: Scalars['String'];
  userId?: InputMaybe<Scalars['String']>;
};

export type Tiers = {
  __typename?: 'Tiers';
  game: Scalars['String'];
  hori?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  image?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  listId?: Maybe<Scalars['Int']>;
  role?: Maybe<Scalars['String']>;
  tier: Scalars['String'];
  title: Scalars['String'];
  userId?: Maybe<Scalars['String']>;
};

export type ListsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListsQuery = { __typename?: 'Query', getLists: Array<{ __typename?: 'Lists', id: number, title?: string | null, userId?: string | null }> };

export type DeleteListMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteListMutation = { __typename?: 'Mutation', deleteList: { __typename?: 'MultiResult', rowsAffected: number } };

export type CreateListMutationVariables = Exact<{
  listInput: ListInput;
}>;


export type CreateListMutation = { __typename?: 'Mutation', createList: { __typename?: 'Lists', id: number } };

export type TiersQueryVariables = Exact<{ [key: string]: never; }>;


export type TiersQuery = { __typename?: 'Query', getTiers: Array<{ __typename?: 'Tiers', listId?: number | null }> };

export type TiersByListQueryVariables = Exact<{
  listId: Scalars['Int'];
}>;


export type TiersByListQuery = { __typename?: 'Query', getAllTiers: Array<{ __typename?: 'Tiers', id: number, title: string, image?: string | null, game: string, tier: string, hori?: number | null, userId?: string | null, listId?: number | null, role?: string | null }> };

export type TiersWithListMutationVariables = Exact<{
  tiers: Array<TierInput> | TierInput;
}>;


export type TiersWithListMutation = { __typename?: 'Mutation', updateMultiTiers: { __typename?: 'MultiResult', rowsAffected: number, success: boolean } };

export type CreateTiersWithIdMutationVariables = Exact<{
  tiers: Array<TierInput> | TierInput;
}>;


export type CreateTiersWithIdMutation = { __typename?: 'Mutation', createTiers: { __typename?: 'MultiResult', rowsAffected: number, success: boolean } };

export type DeleteTiersWithListMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteTiersWithListMutation = { __typename?: 'Mutation', deleteTiers: { __typename?: 'MultiResult', rowsAffected: number } };

export const ListsDocument = gql`
    query Lists {
  getLists {
    id
    title
    userId
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ListsGQL extends Apollo.Query<ListsQuery, ListsQueryVariables> {
    override document = ListsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteListDocument = gql`
    mutation deleteList($id: Int!) {
  deleteList(id: $id) {
    rowsAffected
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteListGQL extends Apollo.Mutation<DeleteListMutation, DeleteListMutationVariables> {
    override document = DeleteListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateListDocument = gql`
    mutation createList($listInput: ListInput!) {
  createList(input: $listInput) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateListGQL extends Apollo.Mutation<CreateListMutation, CreateListMutationVariables> {
    override document = CreateListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const TiersDocument = gql`
    query Tiers {
  getTiers {
    listId
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TiersGQL extends Apollo.Query<TiersQuery, TiersQueryVariables> {
    override document = TiersDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const TiersByListDocument = gql`
    query TiersByList($listId: Int!) {
  getAllTiers(listId: $listId) {
    id
    title
    image
    game
    tier
    hori
    userId
    listId
    role
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TiersByListGQL extends Apollo.Query<TiersByListQuery, TiersByListQueryVariables> {
    override document = TiersByListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const TiersWithListDocument = gql`
    mutation TiersWithList($tiers: [TierInput!]!) {
  updateMultiTiers(input: $tiers) {
    rowsAffected
    success
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TiersWithListGQL extends Apollo.Mutation<TiersWithListMutation, TiersWithListMutationVariables> {
    override document = TiersWithListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateTiersWithIdDocument = gql`
    mutation CreateTiersWithID($tiers: [TierInput!]!) {
  createTiers(input: $tiers) {
    rowsAffected
    success
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateTiersWithIdGQL extends Apollo.Mutation<CreateTiersWithIdMutation, CreateTiersWithIdMutationVariables> {
    override document = CreateTiersWithIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteTiersWithListDocument = gql`
    mutation DeleteTiersWithList($id: Int!) {
  deleteTiers(id: $id) {
    rowsAffected
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteTiersWithListGQL extends Apollo.Mutation<DeleteTiersWithListMutation, DeleteTiersWithListMutationVariables> {
    override document = DeleteTiersWithListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }