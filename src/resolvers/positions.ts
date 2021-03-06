import {
  Ctx,
  Resolver,
  Subscription,
  Query,
  ObjectType,
  Field,
} from "type-graphql";
import { useGetPositions } from "../utils/useGetPositions";

@ObjectType()
class Position {
  @Field({ nullable: true })
  latitude?: number;
  @Field({ nullable: true })
  longitude?: number;
}

@ObjectType()
class Vehicle {
  @Field({ nullable: true })
  id?: string;
  @Field({ nullable: true })
  isDeleted?: boolean;
  @Field({ nullable: true })
  tripId?: string;
  @Field({ nullable: true })
  startTime?: string;
  @Field({ nullable: true })
  startDate?: string;
  @Field({ nullable: true })
  routeId?: string;
  @Field(() => Position, { nullable: true })
  position?: Position;
  @Field({ nullable: true })
  currentStopSequence?: number;
  @Field({ nullable: true })
  currentStatus?: number;
  @Field({ nullable: true })
  timestamp?: number;
  @Field({ nullable: true })
  vehicleId?: string;
}

@ObjectType()
class Feed {
  @Field(() => [Vehicle], { nullable: true })
  feed?: Vehicle[];
  @Field({ nullable: true })
  timestamp?: number;
  @Field({ nullable: true })
  count?: number;
}

@Resolver()
export class PositionsResolver {
  @Query(() => Feed)
  async getpositions(@Ctx() ctx: any) {
    const cache = await ctx.redis.get("positions");
    if (cache) {
      const feed = JSON.parse(cache);
      return feed;
    } else {
      const feed = await useGetPositions();
      await ctx.redis.set("positions", JSON.stringify(feed));
      await ctx.redis.expire("positions", 11);
      return feed;
    }
  }

  @Subscription(() => Feed, {
    topics: "POSITIONS",
  })
  async positions(@Ctx() ctx: any): Promise<any> {
    const cache = await ctx.redis.get("positions");
    if (cache) {
      const feed = JSON.parse(cache);
      return feed;
    } else {
      const feed = await useGetPositions();
      await ctx.redis.set("positions", JSON.stringify(feed));
      await ctx.redis.expire("positions", 11);
      return feed;
    }
  }
}
