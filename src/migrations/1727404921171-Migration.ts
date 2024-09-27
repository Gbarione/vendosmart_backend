import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1727404921171 implements MigrationInterface {
    name = 'Migration1727404921171'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vendor\` ADD \`locationId\` varchar(21) NULL`);
        await queryRunner.query(`ALTER TABLE \`vendor\` ADD CONSTRAINT \`FK_1fece03332202696713a170e1b5\` FOREIGN KEY (\`locationId\`) REFERENCES \`location\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vendor\` DROP FOREIGN KEY \`FK_1fece03332202696713a170e1b5\``);
        await queryRunner.query(`ALTER TABLE \`vendor\` DROP COLUMN \`locationId\``);
    }

}
