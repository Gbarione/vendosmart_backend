import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1727406018844 implements MigrationInterface {
    name = 'Migration1727406018844'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`service\` (\`id\` varchar(21) NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`vendorId\` varchar(21) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`service\` ADD CONSTRAINT \`FK_14207c402a7dfdb6b00eb497c23\` FOREIGN KEY (\`vendorId\`) REFERENCES \`vendor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`service\` DROP FOREIGN KEY \`FK_14207c402a7dfdb6b00eb497c23\``);
        await queryRunner.query(`DROP TABLE \`service\``);
    }

}
