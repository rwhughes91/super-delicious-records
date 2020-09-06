import {
  ObjectType,
  Field,
  registerEnumType,
  Resolver,
  Arg,
  Mutation,
  InputType,
  UseMiddleware,
  Query,
  Int,
} from 'type-graphql'
import { isAuthenticated } from '@middleware/resolver/isAuthenticated'
import { isAdmin } from '@middleware/resolver/isAdmin'
import { Video, VideoInput } from '../types'
import {
  getDataArray,
  getDataItem,
  createDataItem,
  createDataItemWithPid,
} from '@services/firebase/admin'

enum LabelSide {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

registerEnumType(LabelSide, { name: 'LabelSide' })

// Object Types
@ObjectType()
class Intro {
  @Field()
  header!: string

  @Field()
  body!: string
}

@ObjectType()
class BandMember {
  @Field()
  name!: string

  @Field()
  imageUrl!: string

  @Field({ nullable: true })
  instrument?: string
}

@ObjectType()
class AlbumLink {
  @Field()
  website!: string

  @Field()
  youtube!: string

  @Field()
  spotify!: string

  @Field({ nullable: true })
  soundCloud?: string

  @Field({ nullable: true })
  appleMusic?: string
}

@ObjectType()
class Album {
  @Field()
  name!: string

  @Field(() => Int)
  year!: number

  @Field()
  imageUrl!: string

  @Field(() => AlbumLink)
  links!: AlbumLink
}

@ObjectType()
class Artist {
  @Field()
  pid!: string

  @Field()
  name!: string

  @Field()
  website!: string

  @Field()
  imageUrl!: string

  @Field(() => Intro)
  introduction!: Intro

  @Field(() => LabelSide, { nullable: true })
  labelSide?: LabelSide

  @Field(() => [BandMember], { nullable: true })
  bandMembers?: BandMember[]

  @Field(() => [Album], { nullable: true })
  albums?: Album[]

  @Field(() => [Video], { nullable: true })
  videos?: Video[]
}

@ObjectType()
class ArtistName {
  @Field()
  pid!: string

  @Field()
  name!: string
}

// Input Types
@InputType()
class IntroInput implements Partial<Intro> {
  @Field()
  header!: string

  @Field()
  body!: string
}

@InputType()
class BandMemberInput implements Partial<BandMember> {
  @Field()
  name!: string

  @Field()
  imageUrl!: string

  @Field({ nullable: true })
  instrument?: string
}

@InputType()
class AlbumLinkInput implements Partial<AlbumLink> {
  @Field()
  website!: string

  @Field()
  youtube!: string

  @Field()
  spotify!: string

  @Field({ nullable: true })
  soundCloud?: string

  @Field({ nullable: true })
  appleMusic?: string
}

@InputType()
class AlbumInput implements Partial<Album> {
  @Field()
  name!: string

  @Field(() => Int)
  year!: number

  @Field()
  imageUrl!: string

  @Field(() => AlbumLinkInput)
  links!: AlbumLinkInput
}

@InputType()
class ArtistInput implements Partial<Artist> {
  @Field()
  name!: string

  @Field()
  website!: string

  @Field()
  imageUrl!: string

  @Field(() => IntroInput)
  introduction!: IntroInput

  @Field(() => LabelSide, { nullable: true })
  labelSide?: LabelSide

  @Field(() => [BandMemberInput], { nullable: true })
  bandMembers?: BandMemberInput[]

  @Field(() => [AlbumInput], { nullable: true })
  albums?: AlbumInput[]

  @Field(() => [VideoInput], { nullable: true })
  videos?: VideoInput[]
}

// Resolver
@Resolver()
export default class ArtistsResolver {
  @Query(() => [Artist])
  @UseMiddleware(isAuthenticated)
  async getArtists(): Promise<Artist[]> {
    return getDataArray<Artist>('/artists')
  }

  @Query(() => [ArtistName])
  async getArtistsList(): Promise<ArtistName[]> {
    const artists = await getDataArray<Artist>('/artists')
    const listOfArtists = []
    for (const artist of artists) {
      listOfArtists.push({
        name: artist.name,
        pid: artist.pid,
      })
    }
    return listOfArtists
  }

  @Query(() => Artist)
  @UseMiddleware(isAuthenticated)
  async getArtist(@Arg('pid') pid: string): Promise<Artist> {
    return getDataItem<Artist>(`/artists/${pid}`)
  }

  @Mutation(() => String)
  @UseMiddleware(isAdmin)
  async createArtist(@Arg('data') data: ArtistInput): Promise<string> {
    return createDataItem('/artists', data)
  }
  @Mutation(() => String)
  @UseMiddleware(isAdmin)
  async mutateArtist(
    @Arg('data') data: ArtistInput,
    @Arg('pid') pid: string
  ): Promise<true | string> {
    return createDataItemWithPid<Artist>('artists', { ...data, pid })
  }
}
