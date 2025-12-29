<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('suites', function (Blueprint $table) {
            $table->json('images')->nullable()->change();
            $table->string('hero_background_image')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('suites', function (Blueprint $table) {
            $table->json('images')->nullable(false)->change();
            $table->string('hero_background_image')->nullable(false)->change();
        });
    }
};
