import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { MyContext } from '../types/myContext';
import { CreatePollArgs } from './args/createPollArgs.args';
import { AuthGuard } from './auth.guard';
import { GetUserId } from './getUserId.decorator';
import { PollService } from './poll.service';

@Resolver('Poll')
export class PollResolver {
  constructor(private readonly pollService: PollService) {}
  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async createPoll(
    @GetUserId() userId: string,
    @Args() { name, options }: CreatePollArgs,
  ): Promise<Boolean> {
    return this.pollService.createPoll(userId, name, options);
  }
  @Mutation(() => Boolean)
  async vote(
    @Context() ctx: MyContext,
    @Args('pollOptionId') pollOptionId: number,
  ): Promise<Boolean> {
    return this.pollService.vote(ctx, pollOptionId);
  }
}
