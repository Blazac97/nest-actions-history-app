import { Model, Table, Column, DataType } from 'sequelize-typescript';

@Table({ tableName: 'Actions' })
export class Action extends Model {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type: string; // create , update

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;
}
