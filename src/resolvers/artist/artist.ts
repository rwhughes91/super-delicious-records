import {
  ObjectType,
  Field,
  registerEnumType,
  Resolver,
  Arg,
  Mutation,
  InputType,
} from 'type-graphql'
import { Video, VideoInput } from '../types'
import { pushDataToDatabase } from '../../services/firebase/admin'
import { shaveObject } from '../../utils/helpers'
import createBaseResolver from '../baseResolver'

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

  @Field(() => [AlbumLink])
  links!: AlbumLink[]
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

  @Field(() => [AlbumLinkInput])
  links!: AlbumLinkInput[]
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

const ArtistBaseResolver = createBaseResolver('Artist', Artist, '/artists')
// Resolver
@Resolver(() => Artist)
export default class ArtistsResolver extends ArtistBaseResolver {
  @Mutation(() => String)
  // @UseMiddleware(isAdmin)
  async createArtist(@Arg('data') data: ArtistInput): Promise<string> {
    const artistInput = shaveObject(data)
    const newPid = await pushDataToDatabase<ArtistInput>('/artists', artistInput)
    return newPid || ''
  }
}
