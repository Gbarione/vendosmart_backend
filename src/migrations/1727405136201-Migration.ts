import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1727405136201 implements MigrationInterface {
    name = 'Migration1727405136201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vendor\` DROP FOREIGN KEY \`FK_1fece03332202696713a170e1b5\``);
        await queryRunner.query(`CREATE TABLE \`vendor_location\` (\`id\` varchar(21) NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`locationId\` varchar(21) NULL, \`vendorId\` varchar(21) NULL, UNIQUE INDEX \`IDX_3f0c388829c1766728d62d7234\` (\`locationId\`, \`vendorId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`vendor\` DROP COLUMN \`locationId\``);
        await queryRunner.query(`ALTER TABLE \`vendor_location\` ADD CONSTRAINT \`FK_9d79cf1829b9fda367e56daf11c\` FOREIGN KEY (\`locationId\`) REFERENCES \`location\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vendor_location\` ADD CONSTRAINT \`FK_4f18af334b9e92d27b673c83369\` FOREIGN KEY (\`vendorId\`) REFERENCES \`vendor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vendor_location\` DROP FOREIGN KEY \`FK_4f18af334b9e92d27b673c83369\``);
        await queryRunner.query(`ALTER TABLE \`vendor_location\` DROP FOREIGN KEY \`FK_9d79cf1829b9fda367e56daf11c\``);
        await queryRunner.query(`ALTER TABLE \`vendor\` ADD \`locationId\` varchar(21) NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_3f0c388829c1766728d62d7234\` ON \`vendor_location\``);
        await queryRunner.query(`DROP TABLE \`vendor_location\``);
        await queryRunner.query(`ALTER TABLE \`vendor\` ADD CONSTRAINT \`FK_1fece03332202696713a170e1b5\` FOREIGN KEY (\`locationId\`) REFERENCES \`location\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
