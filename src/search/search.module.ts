/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ElasticsearchModule } from "@nestjs/elasticsearch";

@Module({
    imports: [ConfigModule, ElasticsearchModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
            node: configService.get('ELASTICSEARCH_USERNAME'),
            auth: {
                username: configService.get('ELASTICSEARCH_NODE'),
                password: configService.get('ELASTICSEARCH_PASSWORD')
            }
        }),
        inject: [ConfigService]
    })],
    
    //We export ElasticModule so we can use some of its features when importing SearchModule
    exports: [ElasticsearchModule]
})
export class SearchModule {}