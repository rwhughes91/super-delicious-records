import {
  ObjectType,
  Field,
  registerEnumType,
  Resolver,
  Query,
  Arg,
  Mutation,
  InputType,
} from 'type-graphql'
import { getDataArray, getDataItem, pushDataToDatabase } from '../services/firebase/admin'
import { shaveObject } from '../utils/helpers'

enum LabelSide {
  LEFT = 'left',
  RIGHT = 'right',
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

  @Field()
  year!: string

  @Field()
  imageUrl!: string

  @Field((type) => [AlbumLink])
  links!: AlbumLink[]
}

@ObjectType()
class Video {
  @Field()
  title!: string

  @Field()
  src!: string
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

  @Field((type) => Intro)
  introduction!: Intro

  @Field((type) => LabelSide, { nullable: true })
  labelSide?: LabelSide

  @Field((type) => [BandMember], { nullable: true })
  bandMembers?: BandMember[]

  @Field((type) => [Album], { nullable: true })
  albums?: Album[]

  @Field((type) => [Video], { nullable: true })
  videos?: Video[]
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

  @Field()
  year!: string

  @Field()
  imageUrl!: string

  @Field((type) => [AlbumLinkInput])
  links!: AlbumLinkInput[]
}

@InputType()
class VideoInput implements Partial<Video> {
  @Field()
  title!: string

  @Field()
  src!: string
}

@InputType()
class ArtistInput implements Partial<Artist> {
  @Field()
  name!: string

  @Field()
  website!: string

  @Field()
  imageUrl!: string

  @Field((type) => IntroInput)
  introduction!: IntroInput

  @Field((type) => LabelSide, { nullable: true })
  labelSide?: LabelSide

  @Field((type) => [BandMemberInput], { nullable: true })
  bandMembers?: BandMemberInput[]

  @Field((type) => [AlbumInput], { nullable: true })
  albums?: AlbumInput[]

  @Field((type) => [VideoInput], { nullable: true })
  videos?: VideoInput[]
}

// Resolver
@Resolver()
export default class ArtistsResolver {
  @Query(() => [Artist])
  async getArtists(): Promise<Artist[]> {
    const artists = await getDataArray<Artist>('/artists')
    return artists
  }

  @Query(() => Artist)
  async getArtist(@Arg('pid') pid: string): Promise<Artist> {
    const artist = await getDataItem<Artist>(`/artists/${pid}`)
    return artist
  }

  @Mutation(() => String)
  // @UseMiddleware(isAdmin)
  async createArtist(@Arg('data') data: ArtistInput): Promise<string> {
    const artistInput = shaveObject(data)
    const newPid = await pushDataToDatabase<ArtistInput>('/artists', artistInput)
    return newPid || ''
  }
}
