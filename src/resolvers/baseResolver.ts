import { ClassType, Resolver, Query, Arg } from 'type-graphql'
import { getDataArray, getDataItem } from '../services/firebase/admin'

export default function createBaseResolver<T extends ClassType>(
  suffix: string,
  objectTypeCls: T,
  urlLocation: string
): any {
  @Resolver({ isAbstract: true })
  abstract class BaseResolver {
    @Query(() => [objectTypeCls], { name: `get${suffix}Items` })
    async getAllItems(): Promise<T[]> {
      return getDataArray<T>(urlLocation)
    }

    @Query(() => objectTypeCls, { name: `get${suffix}Item` })
    async getItem(@Arg('pid') pid: string): Promise<T> {
      return getDataItem<T>(`${urlLocation}/${pid}`)
    }
  }

  return BaseResolver
}
