<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('first_name', 50)->nullable(false);
            $table->string('last_name', 50)->nullable(false);
            $table->string('username', 50)->unique()->nullable(false)->index();
            $table->string('email')->unique()->nullable(false)->index();
            $table->string('password', 200)->nullable(false);
            $table->string('phone', 15);
            $table->enum('type', ['admin', 'user'])->default('user');
            $table->tinyInteger('active')->nullable(false)->default(1);
            $table->string('ip_address', 25)->nullable();
            $table->text('info')->nullable();
            $table->rememberToken();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('users');
    }
}
