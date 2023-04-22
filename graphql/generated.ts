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
  createTiers: Tiers;
  deleteTiers: MultiResult;
  updateMultiTiers: MultiResult;
};


export type MutationCreateTiersArgs = {
  input: TierInput;
};


export type MutationDeleteTiersArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateMultiTiersArgs = {
  input: Array<TierInput>;
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
  id: Scalars['Int'];
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

export type TiersQueryVariables = Exact<{ [key: string]: never; }>;


export type TiersQuery = { __typename?: 'Query', getTiers: Array<{ __typename?: 'Tiers', title: string, image?: string | null, game: string, tier: string, hori?: number | null, userId?: string | null, listId?: number | null }> };

export type TiersByListQueryVariables = Exact<{
  listId: Scalars['Int'];
}>;


export type TiersByListQuery = { __typename?: 'Query', getAllTiers: Array<{ __typename?: 'Tiers', id: number, title: string, image?: string | null, game: string, tier: string, hori?: number | null, userId?: string | null, listId?: number | null, role?: string | null }> };

export type TiersWithListMutationVariables = Exact<{
  tiers: Array<TierInput> | TierInput;
}>;


export type TiersWithListMutation = { __typename?: 'Mutation', updateMultiTiers: { __typename?: 'MultiResult', rowsAffected: number } };

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
export const TiersDocument = gql`
    query Tiers {
  getTiers {
    title
    image
    game
    tier
    hori
    userId
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