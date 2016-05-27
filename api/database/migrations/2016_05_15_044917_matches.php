<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Matches extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('matches', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('fixture_id')->unsigned();
            $table->integer('home_team_id')->unsigned();
            $table->integer('away_team_id')->unsigned();
            $table->integer('home_result')->unsigned()->nullable();
            $table->integer('away_result')->unsigned()->nullable();
            $table->enum('result', ['Home', 'Draw', 'Away', 'Not played'])->default('Not played');

            $table->foreign('fixture_id')->references('id')->on('fixtures')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreign('home_team_id')->references('id')->on('teams')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreign('away_team_id')->references('id')->on('teams')
                ->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('matches');
    }
}
