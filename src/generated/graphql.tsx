export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  me: User;
  getNews: Array<NewsItem>;
  getNewsItem: NewsItem;
  getArtists: Array<Artist>;
  getArtistsList: Array<ArtistName>;
  getArtist: Artist;
  getEvents: Array<Event>;
  getEvent: Event;
  getShop: Array<ShopItem>;
  getShopItem: ShopItem;
  getOrders: Array<Order>;
  getCart: Array<CartItem>;
};


export type QueryGetNewsItemArgs = {
  pid: Scalars['String'];
};


export type QueryGetArtistArgs = {
  pid: Scalars['String'];
};


export type QueryGetEventArgs = {
  pid: Scalars['String'];
};


export type QueryGetShopItemArgs = {
  pid: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  uid: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
  roles: Array<Scalars['String']>;
};

export type NewsItem = {
  __typename?: 'NewsItem';
  pid: Scalars['String'];
  title: Scalars['String'];
  shortTitle: Scalars['String'];
  imageUrl: Scalars['String'];
  imageSetUrl: Scalars['String'];
  base64: Scalars['String'];
  description: Array<Scalars['String']>;
  date: Scalars['String'];
  videos?: Maybe<Array<Video>>;
  links?: Maybe<Array<Link>>;
};

export type Video = {
  __typename?: 'Video';
  src: Scalars['String'];
  title: Scalars['String'];
};

export type Link = {
  __typename?: 'Link';
  header: Scalars['String'];
  src: Scalars['String'];
  buttonText: Scalars['String'];
};

export type Artist = {
  __typename?: 'Artist';
  pid: Scalars['String'];
  name: Scalars['String'];
  website: Scalars['String'];
  imageUrl: Scalars['String'];
  imageSetUrl: Scalars['String'];
  base64: Scalars['String'];
  introduction: Intro;
  labelSide?: Maybe<LabelSide>;
  bandMembers?: Maybe<Array<BandMember>>;
  albums?: Maybe<Array<Album>>;
  videos?: Maybe<Array<Video>>;
};

export type Intro = {
  __typename?: 'Intro';
  header: Scalars['String'];
  body: Scalars['String'];
};

export enum LabelSide {
  Left = 'LEFT',
  Right = 'RIGHT'
}

export type BandMember = {
  __typename?: 'BandMember';
  name: Scalars['String'];
  imageUrl: Scalars['String'];
  imageSetUrl: Scalars['String'];
  base64: Scalars['String'];
  instrument?: Maybe<Scalars['String']>;
};

export type Album = {
  __typename?: 'Album';
  name: Scalars['String'];
  year: Scalars['Int'];
  imageUrl: Scalars['String'];
  imageSetUrl: Scalars['String'];
  base64: Scalars['String'];
  links: AlbumLink;
};

export type AlbumLink = {
  __typename?: 'AlbumLink';
  website: Scalars['String'];
  youtube: Scalars['String'];
  spotify: Scalars['String'];
  soundCloud?: Maybe<Scalars['String']>;
  appleMusic?: Maybe<Scalars['String']>;
};

export type ArtistName = {
  __typename?: 'ArtistName';
  pid: Scalars['String'];
  name: Scalars['String'];
};

export type Event = {
  __typename?: 'Event';
  pid: Scalars['String'];
  date: Scalars['String'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
};

export type ShopItem = {
  __typename?: 'ShopItem';
  pid: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  images: Array<ShopImage>;
  description: Scalars['String'];
  moreInfo?: Maybe<Scalars['String']>;
  weight: Scalars['String'];
  qtyAvailable: Scalars['Int'];
  tag: Tag;
  colors: Array<Scalars['String']>;
};

export type ShopImage = {
  __typename?: 'ShopImage';
  imageUrl: Scalars['String'];
  imageSetUrl: Scalars['String'];
  alt: Scalars['String'];
  color?: Maybe<Scalars['String']>;
};

export enum Tag {
  Shirt = 'SHIRT',
  Hat = 'HAT',
  Swag = 'SWAG'
}

export type Order = {
  __typename?: 'Order';
  pid: Scalars['String'];
  items: Array<OrderShopItem>;
  amount: Scalars['Float'];
  currency: Scalars['String'];
  date: Scalars['String'];
};

export type OrderShopItem = {
  __typename?: 'OrderShopItem';
  shopPid: Scalars['String'];
  qty: Scalars['Int'];
  purchasePrice: Scalars['Float'];
  color?: Maybe<Scalars['String']>;
  size?: Maybe<Size>;
  shopItem: ShopItemTrimmed;
};

export enum Size {
  Xsmall = 'XSMALL',
  Small = 'SMALL',
  Medium = 'MEDIUM',
  Large = 'LARGE',
  Xlarge = 'XLARGE'
}

export type ShopItemTrimmed = {
  __typename?: 'ShopItemTrimmed';
  name: Scalars['String'];
  images: Array<ShopImage>;
  price: Scalars['Float'];
};

export type CartItem = {
  __typename?: 'CartItem';
  pid: Scalars['String'];
  shopPid: Scalars['String'];
  size?: Maybe<Size>;
  color?: Maybe<Scalars['String']>;
  qty: Scalars['Int'];
  shopItem: ShopItemTrimmed;
};

export type Mutation = {
  __typename?: 'Mutation';
  createNewsItem: Scalars['String'];
  mutateNewsItem: Scalars['String'];
  createArtist: Scalars['String'];
  mutateArtist: Scalars['String'];
  createEvent: Scalars['String'];
  mutateEvent: Scalars['String'];
  createShopItem: Scalars['String'];
  mutateShopItem: Scalars['String'];
  createOrder: Scalars['String'];
  addToCart: Scalars['String'];
  setCart: Scalars['String'];
  removeFromCart: Scalars['String'];
  stripeCreateOrder: StripeId;
};


export type MutationCreateNewsItemArgs = {
  data: NewsInput;
};


export type MutationMutateNewsItemArgs = {
  pid: Scalars['String'];
  data: NewsInput;
};


export type MutationCreateArtistArgs = {
  data: ArtistInput;
};


export type MutationMutateArtistArgs = {
  pid: Scalars['String'];
  data: ArtistInput;
};


export type MutationCreateEventArgs = {
  data: EventInput;
};


export type MutationMutateEventArgs = {
  pid: Scalars['String'];
  data: EventInput;
};


export type MutationCreateShopItemArgs = {
  data: ShopItemInput;
};


export type MutationMutateShopItemArgs = {
  pid: Scalars['String'];
  data: ShopItemInput;
};


export type MutationCreateOrderArgs = {
  data: OrderInput;
};


export type MutationAddToCartArgs = {
  data: CartItemInput;
};


export type MutationSetCartArgs = {
  data: Array<CartItemInput>;
};


export type MutationRemoveFromCartArgs = {
  pid: Scalars['String'];
};


export type MutationStripeCreateOrderArgs = {
  data: Array<CartItemInput>;
};

export type NewsInput = {
  title: Scalars['String'];
  shortTitle: Scalars['String'];
  imageUrl: Scalars['String'];
  imageSetUrl: Scalars['String'];
  base64: Scalars['String'];
  description: Array<Scalars['String']>;
  date: Scalars['String'];
  videos?: Maybe<Array<VideoInput>>;
  links?: Maybe<Array<LinkInput>>;
};

export type VideoInput = {
  src: Scalars['String'];
  title: Scalars['String'];
};

export type LinkInput = {
  header: Scalars['String'];
  src: Scalars['String'];
  buttonText: Scalars['String'];
};

export type ArtistInput = {
  name: Scalars['String'];
  website: Scalars['String'];
  imageUrl: Scalars['String'];
  imageSetUrl: Scalars['String'];
  base64: Scalars['String'];
  introduction: IntroInput;
  labelSide?: Maybe<LabelSide>;
  bandMembers?: Maybe<Array<BandMemberInput>>;
  albums?: Maybe<Array<AlbumInput>>;
  videos?: Maybe<Array<VideoInput>>;
};

export type IntroInput = {
  header: Scalars['String'];
  body: Scalars['String'];
};

export type BandMemberInput = {
  name: Scalars['String'];
  imageUrl: Scalars['String'];
  imageSetUrl: Scalars['String'];
  base64: Scalars['String'];
  instrument?: Maybe<Scalars['String']>;
};

export type AlbumInput = {
  name: Scalars['String'];
  year: Scalars['Int'];
  imageUrl: Scalars['String'];
  imageSetUrl: Scalars['String'];
  base64: Scalars['String'];
  links: AlbumLinkInput;
};

export type AlbumLinkInput = {
  website: Scalars['String'];
  youtube: Scalars['String'];
  spotify: Scalars['String'];
  soundCloud?: Maybe<Scalars['String']>;
  appleMusic?: Maybe<Scalars['String']>;
};

export type EventInput = {
  date: Scalars['String'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
};

export type ShopItemInput = {
  name: Scalars['String'];
  price: Scalars['Float'];
  images: Array<ShopImageInput>;
  description: Scalars['String'];
  qtyAvailable: Scalars['Int'];
  tag: Tag;
  moreInfo?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['String']>;
  colors: Array<Scalars['String']>;
};

export type ShopImageInput = {
  imageUrl: Scalars['String'];
  imageSetUrl: Scalars['String'];
  alt: Scalars['String'];
  color?: Maybe<Scalars['String']>;
};

export type OrderInput = {
  items: Array<OrderShopItemInput>;
  amount: Scalars['Float'];
  currency: Scalars['String'];
  date: Scalars['String'];
};

export type OrderShopItemInput = {
  shopPid: Scalars['String'];
  shopItem: ShopItemTrimmedInput;
  qty: Scalars['Int'];
  purchasePrice: Scalars['Float'];
  color?: Maybe<Scalars['String']>;
  size?: Maybe<Size>;
};

export type ShopItemTrimmedInput = {
  name: Scalars['String'];
  images: Array<ShopImageInput>;
  price: Scalars['Float'];
};

export type CartItemInput = {
  pid: Scalars['String'];
  shopPid: Scalars['String'];
  qty: Scalars['Int'];
  size?: Maybe<Size>;
  color?: Maybe<Scalars['String']>;
  shopItem: ShopItemTrimmedInput;
};

export type StripeId = {
  __typename?: 'StripeId';
  id?: Maybe<Scalars['String']>;
};

export type GetArtistQueryVariables = Exact<{
  pid: Scalars['String'];
}>;


export type GetArtistQuery = (
  { __typename?: 'Query' }
  & { getArtist: (
    { __typename?: 'Artist' }
    & Pick<Artist, 'pid' | 'name' | 'website' | 'imageUrl' | 'imageSetUrl' | 'base64' | 'labelSide'>
    & { introduction: (
      { __typename?: 'Intro' }
      & Pick<Intro, 'header' | 'body'>
    ), bandMembers?: Maybe<Array<(
      { __typename?: 'BandMember' }
      & Pick<BandMember, 'name' | 'imageUrl' | 'imageSetUrl' | 'base64' | 'instrument'>
    )>>, albums?: Maybe<Array<(
      { __typename?: 'Album' }
      & Pick<Album, 'name' | 'year' | 'imageUrl' | 'imageSetUrl'>
      & { links: (
        { __typename?: 'AlbumLink' }
        & Pick<AlbumLink, 'website' | 'youtube' | 'spotify' | 'soundCloud' | 'appleMusic'>
      ) }
    )>>, videos?: Maybe<Array<(
      { __typename?: 'Video' }
      & Pick<Video, 'src' | 'title'>
    )>> }
  ) }
);

export type GetArtistSListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetArtistSListQuery = (
  { __typename?: 'Query' }
  & { getArtistsList: Array<(
    { __typename?: 'ArtistName' }
    & Pick<ArtistName, 'pid' | 'name'>
  )> }
);

export type GetArtistsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetArtistsQuery = (
  { __typename?: 'Query' }
  & { getArtists: Array<(
    { __typename?: 'Artist' }
    & Pick<Artist, 'pid' | 'name' | 'website' | 'imageUrl' | 'imageSetUrl' | 'base64' | 'labelSide'>
    & { introduction: (
      { __typename?: 'Intro' }
      & Pick<Intro, 'header' | 'body'>
    ), bandMembers?: Maybe<Array<(
      { __typename?: 'BandMember' }
      & Pick<BandMember, 'name' | 'imageUrl' | 'imageSetUrl' | 'base64' | 'instrument'>
    )>>, albums?: Maybe<Array<(
      { __typename?: 'Album' }
      & Pick<Album, 'name' | 'year' | 'imageUrl' | 'imageSetUrl' | 'base64'>
      & { links: (
        { __typename?: 'AlbumLink' }
        & Pick<AlbumLink, 'website' | 'youtube' | 'spotify' | 'soundCloud' | 'appleMusic'>
      ) }
    )>>, videos?: Maybe<Array<(
      { __typename?: 'Video' }
      & Pick<Video, 'src' | 'title'>
    )>> }
  )> }
);

export type CreateArtistMutationVariables = Exact<{
  data: ArtistInput;
}>;


export type CreateArtistMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createArtist'>
);

export type MutateArtistMutationVariables = Exact<{
  data: ArtistInput;
  pid: Scalars['String'];
}>;


export type MutateArtistMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'mutateArtist'>
);

export type GetEventQueryVariables = Exact<{
  pid: Scalars['String'];
}>;


export type GetEventQuery = (
  { __typename?: 'Query' }
  & { getEvent: (
    { __typename?: 'Event' }
    & Pick<Event, 'pid' | 'date' | 'title' | 'description' | 'url' | 'endDate' | 'location'>
  ) }
);

export type GetEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEventsQuery = (
  { __typename?: 'Query' }
  & { getEvents: Array<(
    { __typename?: 'Event' }
    & Pick<Event, 'pid' | 'date' | 'title' | 'description' | 'url' | 'endDate' | 'location'>
  )> }
);

export type CreateEventMutationVariables = Exact<{
  data: EventInput;
}>;


export type CreateEventMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createEvent'>
);

export type MutateEventMutationVariables = Exact<{
  data: EventInput;
  pid: Scalars['String'];
}>;


export type MutateEventMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'mutateEvent'>
);

export type GetNewsItemQueryVariables = Exact<{
  pid: Scalars['String'];
}>;


export type GetNewsItemQuery = (
  { __typename?: 'Query' }
  & { getNewsItem: (
    { __typename?: 'NewsItem' }
    & Pick<NewsItem, 'pid' | 'title' | 'shortTitle' | 'imageUrl' | 'imageSetUrl' | 'base64' | 'description' | 'date'>
    & { videos?: Maybe<Array<(
      { __typename?: 'Video' }
      & Pick<Video, 'src' | 'title'>
    )>>, links?: Maybe<Array<(
      { __typename?: 'Link' }
      & Pick<Link, 'header' | 'src' | 'buttonText'>
    )>> }
  ) }
);

export type GetNewsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNewsQuery = (
  { __typename?: 'Query' }
  & { getNews: Array<(
    { __typename?: 'NewsItem' }
    & Pick<NewsItem, 'pid' | 'title' | 'shortTitle' | 'imageUrl' | 'imageSetUrl' | 'base64' | 'description' | 'date'>
    & { videos?: Maybe<Array<(
      { __typename?: 'Video' }
      & Pick<Video, 'src' | 'title'>
    )>>, links?: Maybe<Array<(
      { __typename?: 'Link' }
      & Pick<Link, 'header' | 'src' | 'buttonText'>
    )>> }
  )> }
);

export type CreateNewsItemMutationVariables = Exact<{
  data: NewsInput;
}>;


export type CreateNewsItemMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createNewsItem'>
);

export type MutateNewsItemMutationVariables = Exact<{
  data: NewsInput;
  pid: Scalars['String'];
}>;


export type MutateNewsItemMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'mutateNewsItem'>
);

export type GetCartQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCartQuery = (
  { __typename?: 'Query' }
  & { getCart: Array<(
    { __typename?: 'CartItem' }
    & Pick<CartItem, 'pid' | 'shopPid' | 'size' | 'color' | 'qty'>
    & { shopItem: (
      { __typename?: 'ShopItemTrimmed' }
      & Pick<ShopItemTrimmed, 'name' | 'price'>
      & { images: Array<(
        { __typename?: 'ShopImage' }
        & Pick<ShopImage, 'imageUrl' | 'imageSetUrl' | 'alt' | 'color'>
      )> }
    ) }
  )> }
);

export type AddToCartMutationVariables = Exact<{
  data: CartItemInput;
}>;


export type AddToCartMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addToCart'>
);

export type SetCartMutationVariables = Exact<{
  data: Array<CartItemInput>;
}>;


export type SetCartMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setCart'>
);

export type RemoveFromCartMutationVariables = Exact<{
  data: Scalars['String'];
}>;


export type RemoveFromCartMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeFromCart'>
);

export type GetOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrdersQuery = (
  { __typename?: 'Query' }
  & { getOrders: Array<(
    { __typename?: 'Order' }
    & Pick<Order, 'pid' | 'amount' | 'date'>
    & { items: Array<(
      { __typename?: 'OrderShopItem' }
      & Pick<OrderShopItem, 'shopPid' | 'qty' | 'purchasePrice' | 'color' | 'size'>
      & { shopItem: (
        { __typename?: 'ShopItemTrimmed' }
        & Pick<ShopItemTrimmed, 'name'>
        & { images: Array<(
          { __typename?: 'ShopImage' }
          & Pick<ShopImage, 'imageUrl' | 'imageSetUrl' | 'alt' | 'color'>
        )> }
      ) }
    )> }
  )> }
);

export type CreateOrderMutationVariables = Exact<{
  data: OrderInput;
}>;


export type CreateOrderMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createOrder'>
);

export type GetShopItemQueryVariables = Exact<{
  pid: Scalars['String'];
}>;


export type GetShopItemQuery = (
  { __typename?: 'Query' }
  & { getShopItem: (
    { __typename?: 'ShopItem' }
    & Pick<ShopItem, 'pid' | 'name' | 'price' | 'description' | 'qtyAvailable' | 'tag' | 'moreInfo' | 'weight' | 'colors'>
    & { images: Array<(
      { __typename?: 'ShopImage' }
      & Pick<ShopImage, 'imageUrl' | 'imageSetUrl' | 'alt' | 'color'>
    )> }
  ) }
);

export type GetShopQueryVariables = Exact<{ [key: string]: never; }>;


export type GetShopQuery = (
  { __typename?: 'Query' }
  & { getShop: Array<(
    { __typename?: 'ShopItem' }
    & Pick<ShopItem, 'pid' | 'name' | 'price' | 'description' | 'qtyAvailable' | 'tag' | 'moreInfo' | 'weight' | 'colors'>
    & { images: Array<(
      { __typename?: 'ShopImage' }
      & Pick<ShopImage, 'imageUrl' | 'imageSetUrl' | 'alt' | 'color'>
    )> }
  )> }
);

export type CreateShopItemMutationVariables = Exact<{
  data: ShopItemInput;
}>;


export type CreateShopItemMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createShopItem'>
);

export type MutateShopItemMutationVariables = Exact<{
  data: ShopItemInput;
  pid: Scalars['String'];
}>;


export type MutateShopItemMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'mutateShopItem'>
);

export type StripeCreateOrderMutationVariables = Exact<{
  data: Array<CartItemInput>;
}>;


export type StripeCreateOrderMutation = (
  { __typename?: 'Mutation' }
  & { stripeCreateOrder: (
    { __typename?: 'StripeId' }
    & Pick<StripeId, 'id'>
  ) }
);

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'uid' | 'email' | 'username' | 'roles'>
  ) }
);
