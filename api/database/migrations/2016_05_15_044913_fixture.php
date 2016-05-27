<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Fixture extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fixtures', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('number')->nullable(false);
            $table->integer('season_id')->unsigned();

            $table->foreign('season_id')->references('id')->on('seasons')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->dateTime('start_at')->nullable();
            $table->dateTime('end_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('fixtures');
    }
}
