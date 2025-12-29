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
        Schema::create('suites', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->enum('type', ['junior', 'senior', 'senior_vip', 'villa_familiale']);
            $table->text('description');
            $table->integer('capacity_adults');
            $table->integer('capacity_children');
            $table->decimal('area', 10, 2);
            $table->decimal('weekly_rate', 10, 2);
            $table->decimal('weekend_rate', 10, 2);
            $table->json('features');
            $table->json('images');
            $table->string('main_image');
            $table->string('hero_background_image');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('suites');
    }
};
