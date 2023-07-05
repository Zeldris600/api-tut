/* Modify BaseExcepptionfilter to handle regular exceptions By Creating a filter */

import { Catch, ArgumentsHost } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";

@Catch() //Lets filter catch all exceptions.
export class ExceptionsFilterLogger extends BaseExceptionFilter {
    catch(exception: any, host: ArgumentsHost) { // ArgumentsHost gives us access to the execution context
        console.log('exception thrown', exception);
        super.catch(exception, host)

    }
}

// We can use this filter in 02 ways:
// 01- app.useGlobalFilters (either in main.ts or in the AppModule[Better way!])
// 02- attach it to the useFilter() (Not recomended)