<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CreateTypeEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('type_events', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description')->nullable();
            $table->timestamps();
        });

     
        DB::table('type_events')->insert([
            ['id'=>1, 'name'=> 'Compromiso', 'created_at' => Carbon::now()->toDateTimeString(),  'updated_at' => Carbon::now()->toDateTimeString()],
            ['id'=>2, 'name'=> 'Medicina', 'created_at' => Carbon::now()->toDateTimeString(),  'updated_at' => Carbon::now()->toDateTimeString()],
            ['id'=>3, 'name'=> 'Reunión', 'created_at' => Carbon::now()->toDateTimeString(),  'updated_at' => Carbon::now()->toDateTimeString()],
            ['id'=>4, 'name'=> 'Ósea', 'created_at' => Carbon::now()->toDateTimeString(),  'updated_at' => Carbon::now()->toDateTimeString()],
            ['id'=>5, 'name'=> 'Compra', 'created_at' => Carbon::now()->toDateTimeString(),  'updated_at' => Carbon::now()->toDateTimeString()]
        ]);

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('type_events');
    }
}
